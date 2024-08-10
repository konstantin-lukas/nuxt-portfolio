<script setup lang="ts">
import { ref } from "vue";

const menuOpen = ref(false);
</script>

<template>
    <header>
        <MenuButton
            :class="{ open: menuOpen }"
            @click="() => menuOpen = !menuOpen"
        />
        <MenuOverlay
            :class="{ open: menuOpen }"
            @navigation="() => menuOpen = false"
        />
    </header>
    <main>
        <slot/>
    </main>
</template>

<style scoped lang="scss">
main {
    width: 100%;
    min-height: 100vh;
}
</style>
