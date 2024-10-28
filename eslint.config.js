import prettier from "eslint-config-prettier"
import eslint from "eslint-plugin-prettier"
// @ts-ignore
import hooks from "eslint-plugin-react-hooks"
import tailwind from "eslint-plugin-tailwindcss"
import ts from "@typescript-eslint/eslint-plugin"
export default [
  {
    rules: {
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/non-nullable-type-assertion-style": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "react-hooks/exhaustive-deps": "off",
      "restrict-template-expressions": "off",
      "tailwindcss/no-custom-classnames": "off",
      "tailwindcss/no-custom-classname": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
    },
    plugins: {
      prettier,
      eslint,
      tailwind,
      hooks,
      ts,
    },
  },
]
