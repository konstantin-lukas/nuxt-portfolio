import antfu from "@antfu/eslint-config";

export default antfu({
    type: "app",
    stylistic: {
        indent: 4,
        semi: true,
        quotes: "double",
    },
    rules: {
        "antfu/if-newline": "off",
    },
    typescript: true,
    vue: {
        overrides: {
            "vue/html-closing-bracket-spacing": 0,
        },
    },
});
