/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  env: {
    node: true,
  },
  ignorePatterns: ["!.*"],
  plugins: ["import"],
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  rules: {
    // eslint

    /**
     * note you must disable the base rule as it can report incorrect errors
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/indent.md
     */
    indent: "off",

    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
    "eol-last": ["error", "always"],
    "linebreak-style": ["error", "unix"],
    "sort-imports": [
      "error",
      {
        allowSeparatedGroups: true,
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
      },
    ],

    "no-redeclare": "off",

    // import
    "import/no-duplicates": ["error", { considerQueryString: true }],
    "import/order": [
      "error",
      {
        pathGroups: [
          {
            pattern: "^vue*",
            group: "parent",
            position: "before",
          },
          {
            pattern: "@/**",
            group: "parent",
            position: "after",
          },
        ],
        alphabetize: {
          caseInsensitive: true,
          order: "asc",
        },
        groups: [
          ["index"],
          ["builtin", "external", "object"],
          ["internal", "parent", "sibling"],
          ["type"],
        ],
        "newlines-between": "always",
      },
    ],

    // vue
    "vue/order-in-components": ["error"],
    "vue/html-indent": ["error", 2],
    "vue/multi-word-component-names": "off",
    "vue/component-name-in-template-casing": ["error", "PascalCase"],

    "vue/multiline-html-element-content-newline": [
      "error",
      {
        ignoreWhenEmpty: true,
        ignores: ["pre", "textarea"],
        allowEmptyLines: false,
      },
    ],
    "vue/no-v-html": "off",
    "vue/v-on-event-hyphenation": [
      "error",
      "always",
      {
        autofix: true,
        ignore: [],
      },
    ],

    "vue/define-macros-order": [
      "error",
      {
        order: ["defineProps", "defineEmits"],
      },
    ],

    "vue/block-lang": [
      "error",
      {
        script: {
          lang: "ts",
        },
        style: {
          lang: "scss",
        },
      },
    ],

    "vue/html-button-has-type": [
      "error",
      {
        button: true,
        submit: true,
        reset: true,
      },
    ],

    "vue/no-empty-component-block": "error",
    "vue/prefer-separate-static-class": "error",
    "vue/padding-line-between-blocks": "error",

    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-redeclare": "error",
  },
  overrides: [
    {
      files: ["*.vue"],
      parser: "vue-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
      rules: {
        "no-undef": "off",
      },
    },
    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
      rules: {
        "@typescript-eslint/ban-types": "off",
      },
    },
  ],
};
