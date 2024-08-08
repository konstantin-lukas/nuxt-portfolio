import pluginVue from "eslint-plugin-vue";

export default [
    ...pluginVue.configs["flat/recommended"],
    {
        rules: {
            "vue/html-indent": ["warn", 4, {
                "attribute": 1,
                "baseIndent": 1,
                "closeBracket": 0,
                "alignAttributesVertically": true,
                "ignores": []
            }],
            "vue/multi-word-component-names": ["error", {
                "ignores": ["index"]
            }]
        }
    }
];