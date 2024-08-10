<script setup lang="ts">
import anime from "animejs";

const backAnim = function (path: string, targets: NodeList) {
    anime({
        targets,
        points: path,
        easing: "cubicBezier(0,.5,.56,1.01)",
        duration: 200,
        loop: false,
        complete() {
            this.reverse();
        },
    });
};
</script>

<template>
    <button
        @mouseover="(e: MouseEvent) => {
            e.stopPropagation();
            backAnim('165.1,115.5 270.4,115.5 270.4,168 165.1,168 165.1,168 112.6,168 '
                         + '112.6,230 13.1,141.7 13.1,141.7 112.6,53.5 112.6,115.5 165.1,115.5',
                     (e.currentTarget as HTMLButtonElement).querySelectorAll('svg polygon'),
            );
        }"
        @mouseleave="(e: MouseEvent) => {
            e.stopPropagation();
            backAnim('178.9,141.7 271.7,234.5 234.5,271.7 141.7,178.9 48.9,271.7 '
                         + '11.8,234.5 104.6,141.7 11.8,48.9 48.9,11.8 141.7,104.6 234.5,11.8 271.7,48.9',
                     (e.currentTarget as HTMLButtonElement).querySelectorAll('svg polygon'),
            );
        }"
    >
        <svg viewBox="0 0 283.5 283.5" role="button">
            <polygon points="178.9,141.7 271.7,234.5 234.5,271.7 141.7,178.9 48.9,271.7 11.8,234.5 104.6,141.7 11.8,48.9 48.9,11.8 141.7,104.6 234.5,11.8 271.7,48.9"/>
        </svg>
        <svg viewBox="0 0 283.5 283.5" role="button">
            <polygon points="178.9,141.7 271.7,234.5 234.5,271.7 141.7,178.9 48.9,271.7 11.8,234.5 104.6,141.7 11.8,48.9 48.9,11.8 141.7,104.6 234.5,11.8 271.7,48.9"/>
        </svg>
    </button>
</template>

<style scoped lang="scss">
button {
    width: 2rem;
    height: 2rem;
    padding-right: 5px;
    box-sizing: border-box;
    position: absolute;
    left: 2rem;
    top: 2rem;
    z-index: 2;
}
svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    cursor: pointer;
    &:first-of-type {
        transform: translate(calc(-50% + 5px), -50%);
        polygon {
            fill: var(--pink);
            filter: drop-shadow( 0 0 30px rgba(0, 0, 0, .15));
        }
    }
    &:last-of-type polygon {
        fill: var(--white);
        filter: drop-shadow( 0 0 30px rgba(0, 0, 0, .15));
    }
}
</style>
