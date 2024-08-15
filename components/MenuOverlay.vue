<script setup lang="ts">
defineEmits(["navigation"]);
const route = useRoute();
</script>

<template>
    <div class="menu">
        <span class="menu-background"/>
        <nav class="main-nav">
            <div class="important-nav">
                <NuxtLink
                    to="/"
                    class="home"
                    :class="{ current: route.path === '/' }"
                    @click="$emit('navigation')"
                >
                    Home
                </NuxtLink>
                <NuxtLink
                    to="/projekte"
                    class="projects"
                    :class="{ current: route.path.startsWith('/projekte') }"
                    @click="$emit('navigation')"
                >
                    Projekte
                </NuxtLink>
                <NuxtLink
                    to="https://github.com/konstantin-lukas"
                    target="_blank"
                    class="github"
                    @click="$emit('navigation')"
                >
                    GitHub
                </NuxtLink>
                <span class="anchor"/>
            </div>
            <div class="footer-nav">
                <NuxtLink
                    class="data"
                    to="/datenschutz"
                    @click="$emit('navigation')"
                >
                    <span>Datenschutz</span>
                </NuxtLink>
                <NuxtLink
                    class="notice"
                    to="/impressum"
                    @click="$emit('navigation')"
                >
                    <span>Impressum</span>
                </NuxtLink>
            </div>
        </nav>
    </div>
</template>

<style scoped lang="scss">
.menu {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 100;
    user-select: none;
    &.open {
        width: 100vw;
        height: 100vh;
        & > nav {
            opacity: 1;
        }
        .menu-background {
            width: 300vmax;
            height: 300vmax;
            border-width: var(--border-width);
        }
    }
    & > nav {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        transition: opacity .2s cubic-bezier(0, .5, .5, 1) .4s;
    }
    .menu-background {
        position: absolute;
        background-color: white;
        width: 0;
        height: 0;
        border-radius: 50%;
        top: 3rem;
        right: 3rem;
        display: block;
        transform: translate(50%,-50%);
        transition: all 1s cubic-bezier(0, .5, .5, 1);
        z-index: -1;
        border: 0 var(--gray66) solid;
        box-sizing: border-box;
    }
}

.main-nav {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    .important-nav {
        position: relative;
        margin-left: 25%;
        display: inline-block;
        transition: padding-left .3s cubic-bezier(0, .5, .5, 1), opacity .3s cubic-bezier(0, .5, .5, 1);
    }
    a, span {
        position: relative;
        width: 100%;
        z-index: 1;
        display: block;
        opacity: .3;
        transition: padding-left .3s cubic-bezier(0, .5, .5, 1), opacity .3s cubic-bezier(0, .5, .5, 1);
        font-size: 48px;
        padding: .5em 0;
        line-height: 1em;
    }
    span {
        opacity: 1;
    }
}

@media only screen and (max-height: 550px) {
    .main-nav a, .main-nav span {
        font-size: 32px;
    }
}

@media only screen and (max-width: 550px) {
    .main-nav a, .main-nav span {
        font-size: 36px;
    }
}

@media only screen and (max-width: 350px) {
    .main-nav a, .main-nav span {
        font-size: 30px;
    }
}

@media only screen and (max-width: 300px) {
    .main-nav a, .main-nav span {
        font-size: 26px;
    }
}

@media only screen and (max-width: 250px) {
    .main-nav a, .main-nav span {
        font-size: 24px;
    }
}

@media only screen and (max-height: 350px) {
    .main-nav a, .main-nav span {
        font-size: 24px;
    }
}

@media only screen and (max-height: 250px) {
    .main-nav a, .main-nav span {
        font-size: 18px;
    }
}

.main-nav .important-nav:hover a {
    opacity: .5;
}

.main-nav .important-nav:hover a {
    padding-left: .4em;
}

.main-nav .important-nav a:hover {
    padding-left: .8em;
    opacity: 1;
}

.main-nav .important-nav:hover a.current, .main-nav .important-nav a.current {
    opacity: 1;
}

span.anchor {
    padding:0;height:0;
}

.anchor::before {
    content: "";
    background-color: var(--pink);
    height: .5em;
    width: var(--border-width);
    position: absolute;
    left: -.75em;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    transition: top .5s cubic-bezier(0, .5, .5, 1);
    display: none;
}

.open .anchor::before {
    display: block;
}

.anchor {
    visibility: hidden;
}

.github.current ~ .anchor::before {
    top: -1em;
    visibility: visible;
}

.projects.current ~ .anchor::before {
    top: -3em;
    visibility: visible;
}

.home.current ~ .anchor::before {
    top: -5em;
    visibility: visible;
}

.github:hover ~ .anchor::before {
    top: -1em;
}

.projects:hover ~ .anchor::before {
    top: -3em;
}

.home:hover ~ .anchor::before {
    top: -5em;
}

.footer-nav {
    position: absolute;
    bottom: 1.5rem;
    right: 2rem;
    display: flex;
    align-items: flex-end;
    a {
        opacity: 1;
        padding: 0;
        margin-right: .618em;
        span {
            font-size: 3vh;
            padding: 0;
            transition: transform .5s cubic-bezier(0, .5, .5, 1);
        }
        &::before {
            content: "";
            background-color: var(--pink);
            width: 100%;
            height: var(--border-width);
            transform: scaleX(0);
            position: absolute;
            left: 0;
            bottom: 0;
            transition: transform .5s cubic-bezier(0, .5, .5, 1);
        }
        &:hover::before {
            transform: scaleX(1);
        }
        &:hover span {
            transform: translateY(-38.2%);
        }
        &:last-of-type {
            margin-right: 0;
        }
    }
}

@media only screen and (max-width: 500px) {
    .footer-nav a {
        font-size: 2vh;
    }
}

@media only screen and (max-width: 500px) and (max-height: 650px) {
    .footer-nav a {
        font-size: 3.5vh;
    }
}

@media only screen and (max-width: 320px) and (max-height: 650px) {
    .footer-nav a {
        font-size: 3vh;
    }
    .footer-nav {
        bottom: 10px;
        right: 20px;
    }
    .menu-button {
        top: 15px;
        right: 15px;
    }
}

@media only screen and (max-width: 250px) {
    .footer-nav a {
        font-size: 2.5vh;
    }
}
</style>
