<script setup lang="ts">
defineProps<{
    name: string;
}>();
defineEmits<{
    (e: "selectProject", name: string): void;
}>();

const target = ref<Element | null>(null);
const inView = ref(false);
let observer: IntersectionObserver;
onMounted(() => {
    observer = new IntersectionObserver((entries) => {
        if (entries?.[0].isIntersecting) inView.value = true;
    }, {
        root: document,
        rootMargin: "0px",
        threshold: 0,
    });
    observer.observe(target.value as Element);
});
onBeforeUnmount(() => {
    observer.disconnect();
});
</script>

<template>
    <div
        ref="target"
        class="project-preview"
        :class="{ 'in-view': inView }"
    >
        <h2 class="title">
            <slot/>
        </h2>
        <button class="image-container" role="link" @click="$emit('selectProject', name)">
            <NuxtImg :src="`/images/projects/${name}.webp`" draggable="false"/>
        </button>
    </div>
</template>

<style scoped lang="scss">
@import "assets/styles/mixins";
.project-preview {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    margin-top: -3vw;
    .image-container {
        width: 38.2vw;
        height: 25.5vw;
        overflow: hidden;
        position: relative;
        border-radius: 5vw 0 0 5vw;
        transform: translateX(100%);
        img {
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            @include transition(transform, 500ms);
            user-select: none;
        }
        &:hover img {
            transform: translate(-50%, -50%) scale(1.1);
        }
    }
    h2 {
        font-size: var(--font-size-large);
        color: var(--gray50);
        text-transform: uppercase;
        padding: 0.25em 0 0 0.75em;
        margin: 0 0.75em -.2em 0;
        background: var(--white);
        position: relative;
        transform: translateX(-61.8vw);
        &::before {
            content: "";
            height: var(--border-width);
            width: 100vw;
            background: var(--gray66);
            position: absolute;
            z-index: -1;
            right: 100%;
            top: calc(50% - (1.2 * var(--border-width)) / 2);
        }
    }
    &.in-view {
        .image-container {
            animation: slide-in-from-right 1.25s var(--bezier) forwards;
        }
        h2 {
            animation: slide-in-from-left 1.25s var(--bezier) forwards;
        }
    }
}

.project-preview:nth-of-type(2n) {
    flex-direction: row-reverse;
    h2 {
        padding: 0.25em 0.75em 0 0;
        margin: 0 0 -.2em 0.75em;
        transform: translateX(61.8vw);
        &::before {
            left: 100%;
        }
    }
    .image-container {
        border-radius: 0 5vw 5vw 0;
        transform: translateX(-100%);
    }
    &.in-view {
        .image-container {
            animation: slide-in-from-left 1.25s var(--bezier) forwards;
        }
        h2 {
            animation: slide-in-from-right 1.25s var(--bezier) forwards;
        }
    }
}
</style>
