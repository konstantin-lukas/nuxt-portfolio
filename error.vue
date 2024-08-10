<script setup lang="ts">
function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRGB() {
    const r = getRndInteger(100, 200);
    const g = getRndInteger(100, 200);
    const b = getRndInteger(100, 200);
    return `rgb(${r},${g},${b})`;
}

const dvdState = ref(getResetState());

const prevUpdate = ref(Date.now());
const animSpeed = 0.2;

function getResetState() {
    let w, h;
    if (window.innerWidth < window.innerHeight) {
        w = Math.min(window.innerWidth / 3, 270);
        h = Math.min((w * 121) / 270, 121);
    } else {
        h = Math.min(window.innerHeight / 3, 121);
        w = Math.min((h * 270) / 121, 270);
    }
    return {
        x: window.innerWidth / 2 - w / 2,
        y: window.innerHeight / 2 - h / 2,
        dx: 1,
        dy: 1,
        w,
        h,
        color: getRGB(),
    };
}

function reset() {
    dvdState.value = getResetState();
}

onMounted(() => {
    window.addEventListener("resize", reset);
    const animateDVD = () => {
        const now = Date.now();
        const diff = now - prevUpdate.value;
        dvdState.value.x += dvdState.value.dx * animSpeed * diff;
        dvdState.value.y += dvdState.value.dy * animSpeed * diff;
        if (dvdState.value.y + dvdState.value.h >= window.innerHeight || dvdState.value.y <= 0) {
            dvdState.value.y -= dvdState.value.dy * animSpeed * diff;
            dvdState.value.dy = -dvdState.value.dy;
            dvdState.value.color = getRGB();
        }
        if (dvdState.value.x <= 0 || dvdState.value.x + dvdState.value.w >= window.innerWidth) {
            dvdState.value.x -= dvdState.value.dx * animSpeed * diff;
            dvdState.value.dx = -dvdState.value.dx;
            dvdState.value.color = getRGB();
        }
        prevUpdate.value = Date.now();
        requestAnimationFrame(() => animateDVD());
    };
    animateDVD();
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", reset);
});
</script>

<template>
    <NuxtLayout name="default">
        <div class="container">
            <div id="error_message">
                <h1>Error 404</h1>
                <span>Please insert a disc</span>
            </div>
            <ClientOnly>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 270 121.4"
                    :width="dvdState.w"
                    :height="dvdState.h"
                    :style="{
                        top: `${dvdState.y}px`,
                        left: `${dvdState.x}px`,
                    }"
                >
                    <path
                        d="M153.7,21c0,0-18.6,22.8-17.6,24.3c1.3-1.5-6.7-24.5-6.7-24.5s-1.7-4.9-6.9-20.8h-18.9H57.8H23.2l-3.5,14.9h26.1H52 c16.8,0,27,6.9,24.1,19.2C73,47.5,58.4,53.2,42.8,53.2H37l7.5-32.7h-26L7.4,68.3h37c27.8,0,54.2-14.9,59-34.1 c0.8-3.5,0.7-12.4-1.4-17.6c0-0.1-0.1-0.4-0.2-0.7c-0.1-0.1-0.2-1,0.2-1.1c0.2-0.1,0.7,0.4,0.7,0.5c0,0,0.2,0.6,0.5,1.1l23.5,67.9 l59.9-69.1l25.3-0.1h6.2c16.8,0,27.1,6.9,24.3,19.2c-3.1,13.4-17.8,19.1-33.4,19.1H203l7.6-32.7h-26l-11.1,47.7h37 c27.8,0,54.5-14.9,58.9-34.1c4.5-19.2-15-34.1-43-34.1h-24.5h-30.7C156.5,17.6,153.7,21,153.7,21L153.7,21z"
                        :style="{ fill: dvdState.color }"
                    />
                    <path
                        d="M127.5,84.4C57.1,84.4,0,92.7,0,102.9c0,10.2,57.1,18.5,127.5,18.5c70.5,0,127.6-8.3,127.6-18.5 C255,92.7,198,84.4,127.5,84.4z M122.9,109.5c-16.2,0-29.1-2.8-29.1-6.2c0-3.4,13-6.2,29.1-6.2c16,0,29,2.8,29,6.2 C152,106.7,139,109.5,122.9,109.5z"
                        :style="{ fill: dvdState.color }"
                    />
                </svg>
            </ClientOnly>
        </div>
    </NuxtLayout>
</template>

<style scoped lang="scss">
.container {
    height: 100vh;
    overflow: hidden;
    position: relative;
    svg {
        position: absolute;
    }
    #error_message {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 100%;
        z-index: 1;
    }
    #error_message  h1 {
        font-size: 48px;
        line-height: 1em;
        text-align: center;
        text-transform: uppercase;
    }
    #error_message span {
        font-size: 24px;
        margin-top: .3em;
        text-align: center;
        display: block;
        line-height: 1em;
    }
    @media only screen and (max-width: 700px) {
        #error_message  h1 {
            font-size: 7vw;
        }
        #error_message span {
            font-size: 3.5vw;
        }
    }
}
</style>
