<script setup lang="ts">
useHead({
    meta: [
        {
            name: "description",
            content: "Ich bin Konstantin Lukas, Full-Stack Entwickler und ausgebildeter Mediengestalter Digital & Print",
        },
        {
            name: "keywords",
            content: "Konstantin Lukas, Konstantin, Lukas, Constantin, Lukas Mediengestalter, Full-Stack Developer, "
            + "Entwickler, Next.js, React, Vue, Next, Nuxt, TypeScript, TS, Python, C++, C/C++, HTML, CSS, Rust, PHP, "
            + "JavaScript, JS, XML, JSON, SQL, Sprachen, Languages, Mediengestaltung, Media Design, PM2"
            + "Mediengestalter Digital & Print, Digital, Print, Media, Artificial Intelligence, AI, KI, "
            + "Photoshop, InDesign, Illustrator, Adobe, Kameras, Cameras, Fotografie, Photography, "
            + "Grafikdesign, Vektor, Pixel, Drucker, SEO, Vanilla, Cookies, Session, Zalando, Studios, "
            + "Web Development, Front-End, Back-End, Portfolio",
        },
    ],
});

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
