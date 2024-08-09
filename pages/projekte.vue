<script setup lang="ts">

</script>

<template>
    <div class="container">
        <div class="heading-container">
            <h1>Projekte</h1>
        </div>
        <div>
            <ProjectPreview name="zitatsuchmaschine">
                Zitatsuchmaschine
            </ProjectPreview>
            <ProjectPreview name="oslo">
                Oslo
            </ProjectPreview>
            <ProjectPreview name="anzol">
                Anzol
            </ProjectPreview>
            <ProjectPreview name="nox">
                Nox
            </ProjectPreview>
            <ProjectPreview name="currency-input">
                Currency Input
            </ProjectPreview>
            <ProjectPreview name="untitled-ghost-game">
                Untitled Ghost Game
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