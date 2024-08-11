<script setup lang="ts">
import {
    AmbientLight,
    DirectionalLight,
    Mesh,
    MeshStandardMaterial,
    OrthographicCamera,
    PCFSoftShadowMap,
    Raycaster,
    Scene,
    TextureLoader,
    Vector2,
    WebGLRenderer,
} from "three";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "assets/scripts/rounded";

const sceneContainer = ref(null);
const restart = ref(false);
const mouse = ref(new Vector2());

function trackMouse(e: MouseEvent) {
    mouse.value.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.value.y = -(e.clientY / window.innerHeight) * 2 + 1;
};

const blockWidth = 2.5;
const blockHeight = 1.5;
const blockDepth = 7.5;
const layers = 18;

function initScene() {
    if (sceneContainer.value === null) return;
    restart.value = false;
    (sceneContainer.value as HTMLDivElement).innerHTML = "";
    const scene = new Scene();

    const aspect = window.innerWidth / window.innerHeight;
    const cameraSize = 20;
    const camera = new OrthographicCamera(
        -cameraSize * aspect,
        cameraSize * aspect,
        cameraSize,
        -cameraSize,
        1,
        1000,
    );

    const raycaster = new Raycaster();

    const horizontalThird = (cameraSize * aspect) / 3;
    const verticalThird = (cameraSize) / 3;
    camera.position.set(25, layers + 7, 10);
    camera.lookAt(0, layers - 8, 0);
    camera.translateX(-horizontalThird - blockWidth);
    camera.translateY(verticalThird - (blockHeight * layers) / 6);

    const light = new DirectionalLight(0xFFFFFF, 1);
    light.position.set(5, 3, 1);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    scene.add(light);
    scene.add(light.target);

    const ambience1 = new AmbientLight(0xFFFFFF, 1);
    scene.add(ambience1);
    const ambience2 = new AmbientLight(0xFAE0A3, 1);
    scene.add(ambience2);
    const ambience3 = new AmbientLight(0xFAE0A3, 0.5);
    scene.add(ambience3);

    /* const lightHelper = new DirectionalLightHelper(light);
    lightHelper.color = "#000000";
    scene.add(lightHelper); */

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.setClearColor(0xFFFFFF, 0);

    /* const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.update(); */

    renderer.setSize(window.innerWidth, window.innerHeight);
    (sceneContainer.value as HTMLDivElement).appendChild(renderer.domElement);

    const blocks = generateTower(scene);

    const animate = () => {
        if (restart.value) return;
        raycaster.setFromCamera(mouse.value, camera);
        const intersects = raycaster.intersectObjects(blocks);
        if (intersects.length > 0) {
            // console.log(intersects[0].object);
        }
        // controls.update();
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
    const materialTopSide = new MeshStandardMaterial({
        map: topSideTexture,
    });
    const materialShortSide = new MeshStandardMaterial({
        map: shortSideTexture,
    });
    const materialLongSide = new MeshStandardMaterial({
        map: longSideTexture,
    });

    const blocks = [];
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
            block.position.set((j - 1) * blockWidth + previousRandom, stackHeight, 0);
            block.castShadow = true;
            // block.receiveShadow = true;

            if (i % 2 === 0) {
                block.rotation.y = Math.PI / 2;
                block.position.set(0, stackHeight, (j - 1) * blockWidth + previousRandom);
            }
            blocks.push(block);
            scene.add(block);
        }
        stackHeight += blockHeight;
    }
    return blocks;
}

function resetAnimation() {
    restart.value = true;
    initScene();
}

onMounted(() => {
    initScene();
    window.addEventListener("resize", resetAnimation, false);
    window.addEventListener("mousemove", trackMouse, false);
});
onBeforeUnmount(() => {
    window.removeEventListener("resize", resetAnimation, false);
    window.addEventListener("mousemove", trackMouse, false);
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
