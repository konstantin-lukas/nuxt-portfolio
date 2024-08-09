// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    css: [
        "~/assets/styles/main.scss",
        "~/assets/styles/mixins.scss",
        "~/assets/styles/variables.scss",
        "~/assets/styles/animations.scss",
    ],
    modules: ["@nuxt/fonts", "@nuxt/image"],
    routeRules: {
        "/": { prerender: true },
    },
    fonts: {
        families: [{
            name: "Josefin Sans",
            provider: "google",
            weights: [300],
            styles: ["normal"],
            subsets: ["latin", "latin-ext"],
        }],
    },
});
