<script setup lang="ts">
import {
    AmbientLight,
    DirectionalLight,
    Mesh,
    MeshStandardMaterial,
    OrthographicCamera,
    PlaneGeometry,
    Raycaster,
    Scene,
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
let camera: OrthographicCamera;
let blocks: Mesh[] = [];
let jointConstraint: PointToPointConstraint;
let collisionBoxes: Body[] = [];
const raycaster = new Raycaster();

const planeGeometry = new PlaneGeometry(100, 100);
const movementPlane = new Mesh(planeGeometry);
movementPlane.visible = false;

const blockWidth = 2.5;
const blockHeight = 1.5;
const blockDepth = 7.5;
const layers = 14;

const world = new World();
world.gravity.set(0, -30, 0);

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
}

function initScene() {
    if (sceneContainer.value === null) return;
    collisionBoxes.forEach(box => world.removeBody(box));
    collisionBoxes = [];
    blocks = [];
    restart.value = false;

    (sceneContainer.value as HTMLDivElement).innerHTML = "";
    const scene = new Scene();
    scene.add(movementPlane);

    const aspect = window.innerWidth / window.innerHeight;
    const cameraSize = 20;
    camera = new OrthographicCamera(
        -cameraSize * aspect,
        cameraSize * aspect,
        cameraSize,
        -cameraSize,
        1,
        1000,
    );

    const horizontalThird = (cameraSize * aspect) / 3;
    const verticalThird = (cameraSize) / 3;
    camera.position.set(25, layers + 7, 10);
    camera.lookAt(0, layers - 8, 0);
    camera.translateX(-horizontalThird - blockWidth);
    camera.translateY(verticalThird - (blockHeight * layers) / 6);

    const light = new DirectionalLight(0xFFFFFF, 1);
    light.position.set(5, 3, 1);
    light.target.position.set(0, 0, 0);
    scene.add(light);
    scene.add(light.target);

    const ambience1 = new AmbientLight(0xFFFFFF, 1);
    scene.add(ambience1);
    const ambience2 = new AmbientLight(0xFAE0A3, 1);
    scene.add(ambience2);
    const ambience3 = new AmbientLight(0xFAE0A3, 0.5);
    scene.add(ambience3);

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xFFFFFF, 0);

    renderer.setSize(window.innerWidth, window.innerHeight);
    (sceneContainer.value as HTMLDivElement).appendChild(renderer.domElement);

    generateTower(scene);

    const animate = () => {
        if (restart.value) return;
        world.fixedStep();
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
    const geometry = new RoundedBoxGeometry(blockWidth, blockHeight, blockDepth, 3, 0.1);
    const textureLoader = new TextureLoader();
    const topSideTexture = textureLoader.load("/images/textures/top_side.jpg");
    const shortSideTexture = textureLoader.load("/images/textures/short_side.jpg");
    const longSideTexture = textureLoader.load("/images/textures/long_side.jpg");
    const materialTopSide = new MeshStandardMaterial({ map: topSideTexture });
    const materialShortSide = new MeshStandardMaterial({ map: shortSideTexture });
    const materialLongSide = new MeshStandardMaterial({ map: longSideTexture });

    const blockShape = new Box(new Vec3(blockWidth / 2, blockHeight / 2, blockDepth / 2));
    const _blocks = [];
    const _collisionBoxes = [];
    let stackHeight = 0;
    for (let i = 0; i < layers; i++) {
        let previousRandom = 0;
        for (let j = 0; j < 3; j++) {
            previousRandom += (Math.random() - 0.5) * 0.1;
            const block = new Mesh(geometry, [
                materialLongSide,
                materialLongSide,
                materialTopSide,
                materialTopSide,
                materialShortSide,
                materialShortSide,
            ]);
            block.position.set((j - 1) * blockWidth + previousRandom, stackHeight * 1.1, 0);

            if (i % 2 === 0) {
                block.rotation.y = Math.PI / 2;
                block.position.set(0, stackHeight * 1.1, (j - 1) * blockWidth + previousRandom);
            }

            const blockBody = new Body({
                mass: 5,
                position: new Vec3(block.position.x, block.position.y, block.position.z),
                shape: blockShape,
            });
            blockBody.quaternion.setFromAxisAngle(new Vec3(0, 1, 0), block.rotation.y);
            world.addBody(blockBody);
            _collisionBoxes.push(blockBody);

            _blocks.push(block);
            scene.add(block);
        }
        stackHeight += blockHeight;
    }
    blocks = _blocks;
    collisionBoxes = _collisionBoxes;
}

function resetAnimation() {
    restart.value = true;
    initScene();
}

onMounted(() => {
    initScene();
    window.addEventListener("resize", resetAnimation, false);
    window.addEventListener("pointerdown", onPointerDown, false);
    window.addEventListener("pointermove", onPointerMove, false);
    window.addEventListener("pointerup", onPointerUp, false);
});
onBeforeUnmount(() => {
    window.removeEventListener("resize", resetAnimation, false);
    window.removeEventListener("pointerdown", onPointerDown, false);
    window.removeEventListener("pointermove", onPointerMove, false);
    window.removeEventListener("pointerup", onPointerUp, false);
});
</script>

<template>
    <div ref="sceneContainer"/>
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
