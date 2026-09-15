import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FBF9F5",
          subtle: "#F5F1E8",
          dark: "#EFE8DC",
          border: "#E4DCD0",
        },
        charcoal: {
          DEFAULT: "#121214",
          light: "#1C1C20",
          subtle: "#2A2A30",
          muted: "#66666E",
        },
        bronze: {
          DEFAULT: "#C5A880",
          light: "#E5D6C1",
          dark: "#9E7D47",
          accent: "#D4AF37",
        },
        amber: {
          luxury: "#D97706",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 20px 40px -15px rgba(18, 18, 20, 0.07)",
        "luxury-lg": "0 25px 50px -12px rgba(18, 18, 20, 0.15)",
        "bronze-glow": "0 0 25px -5px rgba(197, 168, 128, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
