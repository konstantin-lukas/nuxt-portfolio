<script setup lang="ts">

</script>

<template>
    <header>
        <MenuButton/>
    </header>
    <main>
        <slot/>
    </main>
</template>

<style scoped lang="scss">
main {
    width: 100vw;
    min-height: 100vh;
}
</style>