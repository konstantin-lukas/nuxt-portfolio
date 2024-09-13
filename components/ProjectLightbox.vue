<script setup lang="ts">
import type { Project } from "~/assets/scripts/types";

defineProps<{
    project: Project;
}>();
defineEmits<{
    (e: "goBack"): void;
}>();
</script>

<template>
    <div class="project-lightbox">
        <div class="image-container">
            <NuxtImg
                :src="`/images/projects/${project.name}.webp`"
                draggable="false"
                sizes="xxl:1080px xl:640px lg:512px"
            />
        </div>
        <div class="project-info">
            <div>
                <h1>{{ project.title }}</h1>
                <span>Jahr: {{ project.year }} | Kontext: {{ project.context }} | Art: {{ project.type }}</span>
                <h2>Über das Projekt</h2>
                <p>
                    {{ project.about }}
                </p>
                <div class="links">
                    <ButtonLink
                        v-for="(link, index) in project.links"
                        :key="index"
                        :to="link.url"
                        target="_blank"
                    >
                        {{ link.text }}
                    </ButtonLink>
                </div>
            </div>
        </div>
        <BackButton @click="$emit('goBack')"/>
    </div>
</template>

<style scoped lang="scss">
.project-lightbox {
    width: 100%;
    height: 100%;
    background: var(--white);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    overflow: hidden;
    .image-container {
        width: 50%;
        height: 100%;
        overflow: hidden;
        position: relative;
        img {
            position: absolute;
            object-fit: cover;
            width: 100%;
            height: 100%;
            user-select: none;
        }
    }
    .project-info {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        & > div {
            padding: 3vw 5vw;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            flex: 0 1 auto;
            flex-direction: column;
            align-items: flex-start;
            margin: auto 0;
            overflow-y: auto;
            overflow-x: hidden;
        }
        h1 {
            font-size: var(--font-size-large);
            text-transform: uppercase;
            position: relative;
            padding-bottom: 1rem;
            margin-bottom: 2rem;
            & + span {
                color: var(--gray50);
                font-size: var(--font-size-small);
            }
            &::after {
                position: absolute;
                width: 100vw;
                height: var(--border-width);
                background: var(--gray66);
                top: 100%;
                left: 0;
                content: "";
            }
        }
        h2 {
            margin-top: 1.2em;
            font-size: var(--font-size-medium);
        }
        p {
            font-size: var(--font-size-small);
            margin-bottom: 2rem;
            color: var(--gray50);
        }
        .links {
            display: flex;
            flex-wrap: wrap;
            gap: 1.5rem 2rem;
        }
    }
}

@media (max-width: 800px) {
    .project-lightbox {
        .project-info {
            & > div {
                padding: 12vw 6vw;
            }
        }
    }
}

@media (orientation: portrait) {
    .project-lightbox {
        flex-direction: column;
        .image-container {
            width: 100%;
            height: 50%;
        }
        .project-info {
            width: 100%;
            height: 50%;
        }
    }
    @media (max-width: 800px) {
        .project-lightbox {
            .project-info {
                & > div {
                    padding: 10vw;
                }
            }
        }
    }
}
</style>
