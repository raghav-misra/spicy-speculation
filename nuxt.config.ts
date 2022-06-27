import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    target: "static",
    css: ["~~/style/index.css"],
    meta: {
        link: [
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Diplomata+SC&family=VT323&display=swap"
            }
        ]
    }
});
