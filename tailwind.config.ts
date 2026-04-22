import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Manrope", "Inter", "system-ui", "sans-serif"]
      },
      colors: {
        surface: "#F7F7F4",
        ink: "#171717",
        muted: "#5C5C57",
        accent: {
          purple: "#6C4BCF",
          violet: "#8B5CF6",
          green: "#173F35"
        },
        border: {
          base: "#D9D8D2",
          green: "#B8CCC3",
          purple: "#C7BAF1"
        }
      },
      borderRadius: {
        pill: "999px"
      },
      boxShadow: {
        focus: "0 0 0 3px rgba(108, 75, 207, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
