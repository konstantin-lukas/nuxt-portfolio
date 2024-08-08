// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    css: [
        '~/assets/main.scss',
        '~/assets/mixins.scss',
        '~/assets/variables.scss'
    ],
    modules: ["@nuxt/fonts"],
    routeRules: {
        '/': { prerender: true }
    }
})