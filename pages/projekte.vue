<script setup lang="ts">
import projects from "assets/scripts/projects";
import anime from "animejs";

const eop = ref<Element | null>(null);
const inView = ref(false);
watch(inView, () => {
    anime({
        targets: ".end-of-page svg *",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "cubicBezier(.36,.81,.31,1)",
        duration: 1500,
    });
});

let observer: IntersectionObserver;
onMounted(() => {
    observer = new IntersectionObserver((entries) => {
        if (entries?.[0].isIntersecting) inView.value = true;
    }, {
        root: document,
        rootMargin: "0px",
        threshold: 1,
    });
    observer.observe(eop.value as Element);
});

onBeforeUnmount(() => {
    observer.disconnect();
});
</script>

<template>
    <div class="container">
        <div class="heading-container">
            <h1>Projekte</h1>
        </div>
        <div>
            <ProjectPreview
                v-for="project in projects"
                :key="project.name"
                :name="project.name"
            >
                {{ project.title }}
            </ProjectPreview>
        </div>
        <div
            ref="eop"
            class="end-of-page"
        >
            <svg viewBox="0 0 283.46 283.46">
                <path class="cls-1" d="M240.78,129.4a99.82,99.82,0,1,1-33.26-62.72"/>
                <polyline class="cls-2" points="93.98 127.18 144.76 177.97 270.92 51.81"/>
            </svg>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    max-width: 100vw;
    margin-top: 25vh;
}

h1 {
    text-transform: uppercase;
    font-size: var(--font-size-huge);
    text-align: right;
    transform: translateY(-100%);
    opacity: 0;
    user-select: none;
    animation: slide-in-from-top 1.75s var(--bezier) forwards;
}

.heading-container {
    width: 38.2vw;
    margin-bottom: calc(-1.2 * var(--font-size-huge));
}

.end-of-page {
    display: flex;
    justify-content: center;
    margin: 20vh 0 30vh 0;
    svg {
        max-width: 200px;
        * {
            fill: none;
            stroke: var(--pink);
            stroke-width: 20px;
            stroke-linecap: round;
            stroke-linejoin: round;
        }
        path {
            stroke-dashoffset: 600px;
            stroke-dasharray: 600px;
        }
        polyline {
            stroke-dashoffset: 260px;
            stroke-dasharray: 260px;
        }
    }
}
</style>
