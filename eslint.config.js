import pluginVue from "eslint-plugin-vue";

export default [
    ...pluginVue.configs["flat/recommended"],
    {
        rules: {
            "vue/html-indent": ["warn", 4, {
                "attribute": 1,
                "baseIndent": 1,
                "closeBracket": 0,
                "alignAttributesVertically": true
            }],
            "vue/multi-word-component-names": ["error", {
                "ignores": ["pages/"]
            }],
            "vue/html-closing-bracket-spacing": ["error", {
                "startTag": "never",
                "endTag": "never",
                "selfClosingTag": "never"
            }]
        }
    },
    {
        files: ["pages/**/*.vue", "layouts/**/*.vue"],
        rules: {
            "vue/multi-word-component-names": "off",
        },
    }
];