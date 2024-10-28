import { type Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

export default {
  darkMode: ["class"],
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
        openSans: ["var(--font-mochiy)", ...fontFamily.sans],
        workSans: ["var(--font-mochiy)", ...fontFamily.sans],
      },
      boxShadow: {
        "inner-lg": "inset 0 4px 6px rgba(0, 0, 0, 0.5)",
        "inner-xl": "inset 0 6px 10px rgba(0, 0, 0, 0.5)",
      },
      keyframes: {
        slideIn: {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "caret-blink": {
          "0%,70%,100%": {
            opacity: "1",
          },
          "20%,50%": {
            opacity: "0",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "slide-in": "slideIn 0.3s ease-in-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config
