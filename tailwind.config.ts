import { type Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      primary: "#E74C3C",
      secondary: "#F4ECDF",
      white: "#FFFEFB",
      foreground: "#1C1E31",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        logo: ["var(--font-mochiy)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config
