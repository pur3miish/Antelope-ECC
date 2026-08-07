import js from "@eslint/js";
import globals from "globals";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**"],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: [
      "src/**/*.ts",
      "test/**/*.ts",
      "scripts/**/*.js",
      "scripts/**/*.mjs",
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
      },
    },

    plugins: {
      "simple-import-sort": simpleImportSort,
    },

    rules: {
      "prefer-const": "off",

      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
);
