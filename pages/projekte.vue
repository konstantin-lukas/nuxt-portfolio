<script setup lang="ts">
import projects from "assets/scripts/projects";

interface Child { cont: Element; projectName: string }
const targets = ref<Child[]>([]);
const inView = ref<{ [key: string]: boolean }>({});
let observer: IntersectionObserver;
onMounted(() => {
    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting)
                inView.value[(entry.target as Element & { projectName: string }).projectName] = true;
        });
    }, {
        root: document,
        rootMargin: "0px",
        threshold: 0,
    });
    targets.value.forEach((elem) => {
        observer.observe(elem?.cont);
        inView.value[elem?.projectName] = false;
    });
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
                ref="targets"
                :key="project.name"
                :name="project.name"
                :class="{ 'in-view': inView[project.name] }"
            >
                {{ project.title }}
            </ProjectPreview>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    max-width: 100vw;
    margin-top: 25vh;
    margin-bottom: 25vh;
}
h1 {
    text-transform: uppercase;
    font-size: var(--font-size-huge);
    text-align: right;
}
.heading-container {
    width: 38.2vw;
    margin-bottom: calc(-1.2 * var(--font-size-huge));
}
</style>
