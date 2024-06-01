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
      foregroundMuted: "#535353",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        logo: ["var(--font-mochiy)", ...fontFamily.sans],
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        "slide-in": "slideIn 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
} satisfies Config
