<script setup lang="ts">

</script>

<template>
    <button>
        <span>
            <span/>
            <span/>
        </span>
    </button>
</template>

<style scoped lang="scss">
@import "../assets/styles/mixins";
button {
    z-index: 101;
    position: fixed;
    top: 2rem;
    right: 2rem;
    width: 2rem;
    height: 1.75rem;
    & > span {
        height: 100%;
        width: 100%;
        transform: skewX(-25deg);
        display: block;
        position: relative;
        @include transition(transform);
        & > span {
            @include transition(all);
            display: block;
            height: 100%;
            width: var(--border-width);
            background-color: var(--pink);
            position: absolute;
            left: 0;
            top: 0;
            transform: translateX(0.5rem);
            &:last-of-type {
                left: initial;
                right: 0;
                transform: translateX(-0.5rem);
            }
        }
    }
    &.open > span {
        transform: none;
        & > span:first-of-type {
            transform: skewX(-45deg) translateX(calc(1rem - var(--border-width) / 2));
            width: calc(0.5px + var(--border-width));
        }
        & > span:last-of-type {
            transform: skewX(45deg) translateX(calc(-1rem + var(--border-width) / 2));
            width: calc(0.5px + var(--border-width));
        }
    }
}
</style>
