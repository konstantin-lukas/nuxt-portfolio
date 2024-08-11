<script setup lang="ts">
import {
    AmbientLight,
    DirectionalLight,
    Mesh,
    MeshStandardMaterial,
    OrthographicCamera,
    PCFSoftShadowMap,
    Scene,
    WebGLRenderer,
} from "three";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "assets/scripts/rounded";

const sceneContainer = ref(null);
const restart = ref(false);

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

    const horizontalThird = (2 * cameraSize * aspect) / 6;
    const verticalThird = (2 * cameraSize) / 3;
    camera.position.set(20, 25, 10);
    camera.lookAt(0, 10, 0);
    camera.translateX(-horizontalThird);
    camera.translateY(verticalThird - blockHeight * (18 - 2) / 2);

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

    generateTower(scene);

    const animate = () => {
        if (restart.value) return;
        // controls.update();
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };
    animate();
}

function generateTower(scene: Scene) {
    const geometry = new RoundedBoxGeometry(blockWidth, blockHeight, blockDepth, 3, 0.1);
    const material = new MeshStandardMaterial({
        color: 0xFAE0A3,
    });
    // const material = new MeshToonMaterial({ color: 0xFFFFFF });

    let stackHeight = 0;
    for (let i = 0; i < layers; i++) {
        let previousRandom = 0;
        for (let j = 0; j < 3; j++) {
            previousRandom += Math.random() * 0.1;
            const block = new Mesh(geometry, material);
            block.position.set((j - 1) * blockWidth + previousRandom, stackHeight, 0);
            block.castShadow = true;
            // block.receiveShadow = true;

            if (i % 2 === 0) {
                block.rotation.y = Math.PI / 2;
                block.position.set(0, stackHeight, (j - 1) * blockWidth + previousRandom);
            }

            scene.add(block);
        }
        stackHeight += blockHeight;
    }
}

function resetAnimation() {
    restart.value = true;
    initScene();
}

onMounted(() => {
    initScene();
    window.addEventListener("resize", resetAnimation);
});
onBeforeUnmount(() => {
    window.removeEventListener("resize", resetAnimation);
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
