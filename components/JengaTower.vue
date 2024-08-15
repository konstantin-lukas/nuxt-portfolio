<script setup lang="ts">
import {
    AmbientLight,
    DirectionalLight,
    Mesh,
    MeshStandardMaterial,
    OrthographicCamera,
    PCFSoftShadowMap,
    PlaneGeometry,
    Raycaster,
    RepeatWrapping,
    Scene,
    ShadowMaterial,
    type Texture,
    TextureLoader,
    Vector2,
    type Vector3,
    WebGLRenderer,
} from "three";
import { RoundedBoxGeometry } from "assets/scripts/rounded";
import { Body, Box, Plane, PointToPointConstraint, Sphere, Vec3, World } from "cannon-es";

const sceneContainer = ref(null);
const restart = ref(false);
const isDragging = ref(false);
const camera = new OrthographicCamera();
let blocks: Mesh[] = [];
let jointConstraint: PointToPointConstraint;
let collisionBoxes: Body[] = [];
const raycaster = new Raycaster();

const planeGeometry = new PlaneGeometry(100, 100);
const movementPlane = new Mesh(planeGeometry);
movementPlane.visible = false;

const scene = new Scene();
scene.add(movementPlane);

const lights = [
    new DirectionalLight(0xFFFFFF, 1),
    new AmbientLight(0xFAE0A3, 1.5),
    new AmbientLight(0xFFFFFF, 1),
];
lights[0].position.set(100, 200, 0);
(lights[0] as DirectionalLight).target.position.set(0, 0, 0);
lights[0].castShadow = true;
lights.forEach(l => scene.add(l));

const blockWidth = 2.5;
const blockHeight = 1.5;
const blockDepth = 7.5;
const layers = 14;

const world = new World();
world.gravity.set(0, -9.8, 0);

const groundGeometry = new PlaneGeometry(200, 200);
const shadowMaterial = new ShadowMaterial({ opacity: 0.1 });
const groundMesh = new Mesh(groundGeometry, shadowMaterial);
groundMesh.rotation.x = -Math.PI / 2;
groundMesh.receiveShadow = true;
scene.add(groundMesh);

const groundBody = new Body({
    type: Body.STATIC,
    shape: new Plane(),
});

const jointShape = new Sphere(0.1);
const jointBody = new Body({ mass: 0 });
jointBody.addShape(jointShape);
jointBody.collisionFilterGroup = 0;
jointBody.collisionFilterMask = 0;

world.addBody(jointBody);
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(groundBody);
world.allowSleep = true;

const renderer = new WebGLRenderer({ antialias: true });
renderer.setClearColor(0xFFFFFF, 0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;

const geometry = new RoundedBoxGeometry(blockWidth, blockHeight, blockDepth, 2, 0.1);
const textureLoader = new TextureLoader();
let loadedTextures = ref(0);
const topCount = 7;
const shortCount = 12;
const sideCount = 12;
const topTextures = Array.from({ length: topCount }, (_, i) => {
    return textureLoader.load(`/images/textures/top${i + 1}.webp`, () => loadedTextures.value++);
});
const shortTextures = Array.from({ length: shortCount }, (_, i) => {
    return textureLoader.load(`/images/textures/short${i + 1}.webp`, () => loadedTextures.value++);
});
const sideTextures = Array.from({ length: sideCount }, (_, i) => {
    return textureLoader.load(`/images/textures/side${i + 1}.webp`, () => loadedTextures.value++);
});

function textureToMaterials(t: Texture) {
    const t1 = new MeshStandardMaterial({ map: t });
    const tmp = t.clone();
    tmp.wrapS = RepeatWrapping;
    tmp.wrapT = RepeatWrapping;
    tmp.rotation = Math.PI;
    const t2 = new MeshStandardMaterial({ map: tmp });
    return [t1, t2];
};
const topMaterials = topTextures.flatMap(textureToMaterials);
const shortMaterials = shortTextures.flatMap(textureToMaterials);
const sideMaterials = sideTextures.flatMap(textureToMaterials);
const blockShape = new Box(new Vec3(blockWidth / 2, blockHeight / 2, blockDepth / 2));

function getHitPoint(clientX: number, clientY: number, meshes: Mesh[]) {
    const mouse = new Vector2();
    mouse.x = (clientX / window.innerWidth) * 2 - 1;
    mouse.y = -((clientY / window.innerHeight) * 2 - 1);
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(meshes);
    return hits.length > 0 ? hits[0] : undefined;
}

function moveMovementPlane(point: Vector3) {
    movementPlane.position.copy(point);
    movementPlane.quaternion.copy(camera.quaternion);
}

function addJointConstraint(position: Vec3, constrainedBody: Body) {
    const vector = new Vec3().copy(position).vsub(constrainedBody.position);
    const antiRotation = constrainedBody.quaternion.inverse();
    const pivot = antiRotation.vmult(vector);
    jointBody.position.copy(position);
    jointConstraint = new PointToPointConstraint(constrainedBody, pivot, jointBody, new Vec3(0, 0, 0));
    world.addConstraint(jointConstraint);
}

function onPointerDown(e: PointerEvent) {
    const intersection = getHitPoint(e.clientX, e.clientY, blocks);
    if (!intersection) return;
    collisionBoxes.forEach((box) => {
        box.wakeUp();
        box.allowSleep = false;
    });
    const idx = blocks.indexOf(intersection?.object as any);
    const hp = intersection?.point;
    const hitPoint = new Vec3(...hp);
    moveMovementPlane(hp);
    addJointConstraint(hitPoint, collisionBoxes[idx]);
    requestAnimationFrame(() => {
        isDragging.value = true;
    });
}

function onPointerMove(e: PointerEvent) {
    if (!isDragging.value) return;
    const hitPoint = getHitPoint(e.clientX, e.clientY, [movementPlane]);
    if (hitPoint) {
        jointBody.position.copy(new Vec3(...hitPoint.point));
        jointConstraint?.update();
    }
}

function onPointerUp() {
    isDragging.value = false;
    world.removeConstraint(jointConstraint);
    collisionBoxes.forEach((box) => {
        box.allowSleep = true;
    });
}

function onResize() {
    const aspect = window.innerWidth / window.innerHeight;
    const cameraSize = window.innerWidth > 600 ? 20 : 30;
    const horizontalThird = (cameraSize * aspect) / 3;
    const verticalThird = (cameraSize) / 3;
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.left = -cameraSize * aspect;
    camera.right = cameraSize * aspect;
    camera.top = cameraSize;
    camera.bottom = -cameraSize;
    camera.updateProjectionMatrix();
    camera.position.set(250, 10 * layers + 70, 100);
    camera.lookAt(0, layers - 8, 0);
    camera.translateX(-horizontalThird - blockWidth);
    camera.translateY(verticalThird - (blockHeight * layers) / 6);

    (lights[0] as DirectionalLight).shadow.mapSize.set(5000, 5000);
    (lights[0] as DirectionalLight).shadow.camera.left = -cameraSize * aspect * 2;
    (lights[0] as DirectionalLight).shadow.camera.right = cameraSize * aspect * 2;
    (lights[0] as DirectionalLight).shadow.camera.top = cameraSize * 4;
    (lights[0] as DirectionalLight).shadow.camera.bottom = -cameraSize * 4;
    (lights[0] as DirectionalLight).shadow.camera.near = 1;
    (lights[0] as DirectionalLight).shadow.camera.far = 300;
    (lights[0] as DirectionalLight).shadow.camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function cleanUp() {
    collisionBoxes.forEach(box => world.removeBody(box));
    collisionBoxes = [];
    blocks.forEach(block => scene.remove(block));
    blocks = [];
    if (sceneContainer.value !== null) (sceneContainer.value as HTMLDivElement).innerHTML = "";
}

function initScene() {
    if (sceneContainer.value === null) return;
    restart.value = false;
    onResize();
    (sceneContainer.value as HTMLDivElement).appendChild(renderer.domElement);

    generateTower(scene);

    const animate = () => {
        if (restart.value) return;
        world.step(1 / 30);
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].position.copy(collisionBoxes[i].position);
            blocks[i].quaternion.copy(collisionBoxes[i].quaternion);
        }
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };
    animate();
}

function generateTower(scene: Scene) {
    let stackHeight = blockHeight;
    for (let i = 0; i < layers; i++) {
        let previousRandom = 0;
        for (let j = 0; j < 3; j++) {
            previousRandom += (Math.random() - 0.5) * 0.1;
            const block = new Mesh(geometry, [
                sideMaterials[Math.floor(Math.random() * sideMaterials.length)],
                sideMaterials[Math.floor(Math.random() * sideMaterials.length)],
                topMaterials[Math.floor(Math.random() * topMaterials.length)],
                topMaterials[Math.floor(Math.random() * topMaterials.length)],
                shortMaterials[Math.floor(Math.random() * shortMaterials.length)],
                shortMaterials[Math.floor(Math.random() * shortMaterials.length)],
            ]);
            block.position.set((j - 1) * blockWidth + previousRandom, stackHeight * 1.1, 0);

            if (i % 2 === 0) {
                block.rotation.y = Math.PI / 2;
                block.position.set(0, stackHeight * 1.1, (j - 1) * blockWidth + previousRandom);
            }
            block.castShadow = true;
            block.receiveShadow = true;

            const blockBody = new Body({
                mass: 0.1,
                position: new Vec3(block.position.x, block.position.y, block.position.z),
                shape: blockShape,
            });
            blockBody.allowSleep = true;
            blockBody.sleepSpeedLimit = 0.2;
            blockBody.sleepTimeLimit = 3;
            blockBody.quaternion.setFromAxisAngle(new Vec3(0, 1, 0), block.rotation.y);
            world.addBody(blockBody);
            collisionBoxes.push(blockBody);

            blocks.push(block);
            scene.add(block);
        }
        stackHeight += blockHeight;
    }
}
onMounted(() => {
    initScene();
    window.addEventListener("resize", onResize, false);
    window.addEventListener("pointerdown", onPointerDown, false);
    window.addEventListener("pointermove", onPointerMove, false);
    window.addEventListener("pointerup", onPointerUp, false);
});
onBeforeUnmount(() => {
    cleanUp();
    window.removeEventListener("resize", onResize, false);
    window.removeEventListener("pointerdown", onPointerDown, false);
    window.removeEventListener("pointermove", onPointerMove, false);
    window.removeEventListener("pointerup", onPointerUp, false);
});
const emit = defineEmits<{
    (e: "loaded"): void;
}>();
watch(loadedTextures, () => {
    if (topCount + sideCount + shortCount === loadedTextures.value) emit("loaded");
});
</script>

<template>
    <div ref="sceneContainer" v-show="topCount + sideCount + shortCount === loadedTextures"/>
</template>

<style scoped lang="scss">
div {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
}
</style>
