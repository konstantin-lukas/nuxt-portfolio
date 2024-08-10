<script setup lang="ts">
import projects from "assets/scripts/projects";
import anime from "animejs";
import type { Project } from "assets/scripts/types";

const route = useRoute();
const initialProject = projects.find(proj => proj.name === route.params.project);
if (route.params.project !== "" && typeof initialProject === "undefined") {
    throw createError({
        statusCode: 404,
        statusMessage: "Project not found.",
    });
}

const defaultProjectName = "Projekte";
const defaultProjectDescription = "Hier findest du einige meiner Programmierprojekte aus meiner Ausbildung, Arbeit, "
    + "Freizeit oder Studium.";

useHead({
    title: `${initialProject ? initialProject.title : defaultProjectName} | Konstantin Lukas`,
    meta: [
        {
            name: "description",
            content: initialProject
                ? initialProject.about
                : defaultProjectDescription,
        },
    ],
});

const selectedProject = ref<Project | null>(initialProject ?? null);

watch(selectedProject, () => {
    const projectName = selectedProject.value?.name ?? "";
    const projectPath = (projectName !== "" ? `/${projectName}` : "");
    const url = `/projekte${projectPath}`;
    window.history.replaceState({}, "", url);
    if (projectName === "") {
        document.title = `${defaultProjectName} | Konstantin Lukas`;
    } else {
        document.title = `${selectedProject.value?.title} | Konstantin Lukas`;
    }
});

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
function onBeforeEnter() {
    const isChromium = !!(window as any).chrome;
    if (!isChromium) return;
    const scrollBarWidth = window.innerWidth - document.body.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    const menuButton = document.getElementById("menu-button");
    if (menuButton) {
        menuButton.style.marginRight = `${scrollBarWidth}px`;
    }
}
function onAfterLeave() {
    const isChromium = !!(window as any).chrome;
    if (!isChromium) return;
    document.body.style.paddingRight = "0";
    document.body.style.overflow = "auto";
    const menuButton = document.getElementById("menu-button");
    if (menuButton) {
        menuButton.style.marginRight = "0";
    }
}
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
        <Transition
            name="fade"
            @before-enter="onBeforeEnter"
            @after-leave="onAfterLeave"
        >
            <div v-if="selectedProject !== null" class="project-lightbox">
                <ProjectLightbox :project="selectedProject" @go-back="selectedProject = null"/>
            </div>
        </Transition>
        <div class="heading-container">
            <h1>Projekte</h1>
        </div>
        <div>
            <ProjectPreview
                v-for="(project, index) in projects"
                :key="project.name"
                :name="project.name"
                :style="{ zIndex: projects.length - index }"
                @select-project="name => selectedProject = projects.find((proj) => proj.name === name) ?? null"
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
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

.fade-enter-to, .fade-leave-from {
    opacity: 1;
}

.fade-enter-active, .fade-leave-active {
    transition: all 200ms linear;
}

.container {
    width: 100%;
    margin-top: 25vh;
    position: relative;
    z-index: 0;
    & > *:not(.project-lightbox) {
        z-index: -1;
        position: relative;
    }
    & > .project-lightbox {
        z-index: 1;
    }
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

@media (max-width: 660px) {
    .heading-container {
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 0;
        padding: 0 10vw;
        h1 {
            width: 100%;
            margin: 0 0 1em 0;
            text-align: initial;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}
</style>
