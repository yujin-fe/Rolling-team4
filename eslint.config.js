import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import pluginReact from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

export default defineConfig([
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: {
      js,
      "simple-import-sort": simpleImportSort,
    },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-unused-vars": "warn", // 사용 안 하는 변수 경고
      "no-undef": "error", // 정의 안 된 변수 에러
      eqeqeq: "error", // == 대신 === 강제
      indent: ["error", 2], // 들여쓰기 2칸
      "prefer-const": "error", // 재할당 없는 변수는 const
      "no-var": "error", // var 금지
      "react/react-in-jsx-scope": "off", // React 17+에서는 필요 없음
      "react/prop-types": "off",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [["^\\u0000", "^react", "^@?\\w"], ["^\\.\\./"], ["^\\./"]],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
]);
