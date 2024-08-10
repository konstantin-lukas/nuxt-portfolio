<script setup lang="ts">
import {
    BoxGeometry,
    DirectionalLight,
    Mesh,
    MeshStandardMaterial,
    OrthographicCamera,
    PCFSoftShadowMap,
    Scene,
    WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const sceneContainer = ref(null);

function initScene() {
    if (sceneContainer.value === null) return;
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
    /* const camera = new PerspectiveCamera(
        90,
        aspect,
    ); */
    camera.position.set(200, 100, 80);
    camera.lookAt(0, 20, 0);

    const light = new DirectionalLight("#ffffff", 1);
    light.position.set(5, 3, 1);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    scene.add(light);
    scene.add(light.target);

    /* const lightHelper = new DirectionalLightHelper(light);
    lightHelper.color = "#000000";
    scene.add(lightHelper); */

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.setClearColor("#ffffff", 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.update();

    renderer.setSize(window.innerWidth, window.innerHeight);
    (sceneContainer.value as HTMLDivElement).appendChild(renderer.domElement);
    camera.position.z = 10;

    generateTower(scene);

    const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        // console.log("Camera Position:", camera.position);
        // console.log("Camera Rotation:", camera.rotation);
        renderer.render(scene, camera);
    };
    animate();
}

function generateTower(scene: Scene) {
    const blockWidth = 2.5;
    const blockHeight = 1.5;
    const blockDepth = 7.5;

    const geometry = new BoxGeometry(blockWidth, blockHeight, blockDepth);
    const material = new MeshStandardMaterial({ color: 0xB58868 });

    let stackHeight = 0;
    const layers = 18;
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

onMounted(() => {
    initScene();
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
