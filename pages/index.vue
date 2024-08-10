<script setup lang="ts">
useHead({
    title: "Konstantin Lukas | Full-Stack Developer",
});
</script>

<template>
    <div class="container">
        <div class="heading-container">
            <h1>Konstantin Lukas</h1>
            <h2>Full-Stack Developer</h2>
        </div>
        <ButtonLink to="/projekte">
            Projekte
        </ButtonLink>
    </div>
</template>

<style scoped lang="scss">
.container {
    position: relative;
    display: inline-block;
    top: 0;
    left: 12.5vw;
}
h1 {
    font-size: var(--font-size-large);
    text-transform: uppercase;
}
h2 {
    color: var(--gray50);
    font-size: var(--font-size-medium);
}
.heading-container {
    --padding: 1.6rem;
    margin-top: calc(38.2vh - var(--font-size-large));
    margin-bottom: calc(23.6vh - var(--font-size-large));
    position: relative;
    &::before, &::after {
        content: "";
        width: var(--border-width);
        position: absolute;
        left: var(--font-size-large);
        background: var(--gray66);
    }
    &::before {
        height: calc(38.2vh - var(--font-size-large));
        bottom: calc(100% + var(--padding));
    }
    &::after {
        height: calc(23.6vh - var(--font-size-large) - var(--padding) * 2);
        top: calc(100% + var(--padding) - 0.2em);
    }
}
</style>
