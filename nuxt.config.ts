// https://nuxt.com/docs/api/configuration/nuxt-config
import projects from "./assets/scripts/projects";
import type { SitemapUrlInput } from "#sitemap";

export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    css: [
        "~/assets/styles/main.scss",
        "~/assets/styles/mixins.scss",
        "~/assets/styles/variables.scss",
        "~/assets/styles/animations.scss",
    ],
    modules: ["@nuxt/fonts", "@nuxt/image", "@nuxtjs/sitemap"],
    routeRules: {
        "/": { prerender: true },
        "/projekte": { prerender: true },
        "/impressum": { prerender: true },
        "/datenschutz": { prerender: true },
    },
    fonts: {
        experimental: {
            disableLocalFallbacks: true,
        },
        families: [{
            name: "Josefin Sans",
            provider: "google",
            weights: [300],
            styles: ["normal"],
            subsets: ["latin", "latin-ext"],
        }],
    },
    runtimeConfig: {
        public: {
            siteUrl: "https://konstantinlukas.de",
        },
    },
    site: {
        url: "https://konstantinlukas.de",
        name: "Konstantin Lukas | Full-Stack Developer",
    },
    sitemap: {
        defaults: {
            changefreq: "monthly",
            lastmod: new Date(),
        },
        excludeAppSources: true,
        urls: () => {
            const routes = [
                {
                    priority: 1,
                    url: "https://konstantinlukas.de",
                    changefreq: "never",
                },
                {
                    priority: 0.9,
                    url: "https://konstantinlukas.de/projekte",
                    changefreq: "monthly",
                },
            ];
            return [...routes, ...projects.map(p => ({
                priority: 0.8,
                loc: `https://konstantinlukas.de/projekte/${p.name}`,
                changefreq: "never",
            }))] as SitemapUrlInput[];
        },
    },
});
