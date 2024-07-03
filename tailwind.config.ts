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
      popover: "#FFFEFB",
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "slide-in": "slideIn 0.3s ease-in-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config
