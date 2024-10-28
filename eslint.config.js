import prettier from "eslint-config-prettier"
import eslint from "eslint-plugin-prettier"
// @ts-ignore
import hooks from "eslint-plugin-react-hooks"
import tailwind from "eslint-plugin-tailwindcss"
import ts from "@typescript-eslint/eslint-plugin"
export default [
  {
    rules: {},
    plugins: {
      prettier,
      eslint,
      tailwind,
      hooks,
      ts,
    },
  },
]
