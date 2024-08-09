<script setup lang="ts">

</script>

<template>
    <NuxtLink>
        <slot/>
    </NuxtLink>
</template>

<style scoped lang="scss">
@import "../assets/styles/mixins";
a {
    color: var(--white);
    background-color: transparent;
    border: var(--border-width) solid var(--black);
    position: relative;
    font-size: var(--font-size-medium);
    padding: 0.2em 1em 0.1em 1em;
    display: inline-block;
    border-radius: .55em;
    &::after {
        content: "";
        width: calc(100% + 2px);
        height: calc(100% + 2px);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-44%, -42%);
        background-color: var(--pink);
        z-index: -1;
        border-radius: .5em;
        @include transition(transform);
    }
    &:hover::after {
        transform: translate(-50%, -50%);
    }
}
</style>
