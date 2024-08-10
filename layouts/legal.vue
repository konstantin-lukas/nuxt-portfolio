<script setup lang="ts">

</script>

<template>
    <div class="legal-wrapper">
        <slot/>
    </div>
</template>

<style lang="scss">
.legal-wrapper {
    width: 31.8%;
    margin: auto;
    padding-bottom: 75px;
    max-width: 700px;
    .inline-link {
        position: relative;
        color: var(--pink);
    }

    .inline-link::after {
        content: "";
        position: absolute;
        right: 0;
        width: 0;
        bottom: -.1em;
        background: var(--pink);
        height: var(--border-width);
        -webkit-transition: width 0.3s var(--bezier);
        -o-transition: width 0.3s var(--bezier);
        transition: width 0.3s var(--bezier);
    }

    .inline-link:hover::after {
        left: 0;
        right: auto;
        width: 100%;
    }
    ul {
        list-style: initial;
        margin-left: 1em;
        font-size: var(--font-size-small);
    }
    h1 {
        font-size: var(--font-size-large);
        margin-top: 2em;
        text-transform: uppercase;
    }
    h2 {
        display: inline-block;
        font-size: var(--font-size-medium);
        margin-top: .5em;
        margin-bottom: .33em;
        text-decoration: underline;
        -webkit-text-decoration-color: #ff2977;
        text-decoration-color: #ff2977;
    }
    h3 {
        font-weight: 400;
        margin-top: 1em;
        margin-bottom: .2em;
        font-size: var(--font-size-medium);
    }
    h4 {
        font-weight: 400;
        margin-top: 1em;
        margin-bottom: .2em;
        font-size: var(--font-size-small);
    }
    p {
        margin-top: 1em;
        font-size: 21px;
        text-align: justify;
        -webkit-hyphens: auto;
        -ms-hyphens: auto;
        hyphens: auto;
    }
    a {
        font-size: 21px;
    }
    @media only screen and (max-width: 550px) {
        h1 {
            font-size: 48px;
        }
        h2 {
            font-size: 28px;
        }
        h3 {
            font-size: 21px;
        }
        h4 {
            font-size: 18px;
        }
        p {
            font-size: 18px;
        }
        a {
            font-size: 18px;
        }
    }
    @media only screen and (max-width: 420px) {
        h1 {
            font-size: 36px;
        }
        h2 {
            font-size: 24px;
        }
        h3 {
            font-size: 18px;
        }
        h4 {
            font-size: 16px;
        }
        p {
            font-size: 16px;
        }
        a {
            font-size: 16px;
        }
    }
}
@media only screen and (max-width: 1600px) {
    .legal-wrapper {
        width: 50%;
    }
}
@media only screen and (max-width: 950px) {
    .legal-wrapper {
        width: 61.8%;
    }
}
@media only screen and (max-width: 750px) {
    .legal-wrapper {
        width: 75%;
    }
}
@media only screen and (max-width: 600px) {
    .legal-wrapper {
        width: 80%;
    }
}
</style>
