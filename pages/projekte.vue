<script setup lang="ts">
import projects from "assets/scripts/projects";
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