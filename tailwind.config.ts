import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2E7D32",
          50: "#F1F8E9",
          100: "#DCEDC8",
          200: "#C5E1A5",
          300: "#AED581",
          400: "#81C784",
          500: "#4CAF50",
          600: "#2E7D32",
          700: "#1B5E20",
          800: "#144917",
          900: "#0b2e0e",
        },
        beige: {
          DEFAULT: "#FFF8E1",
          50: "#FFFDE7",
          100: "#FFF9C4",
          200: "#FFF59D",
          300: "#FFF176",
          400: "#FFEE58",
          500: "#FFEB3B",
          600: "#FDD835",
          700: "#FBC02D",
          800: "#F9A825",
          900: "#F57F17",
        },
        cream: "#FDFAF3",
        leaf: "#388E3C",
        earth: "#4E342E",
        terracotta: "#D84315",
      },
      fontFamily: {
        devanagari: ["var(--font-noto-sans-devanagari)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(46, 125, 50, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'lift': '0 12px 30px -4px rgba(46, 125, 50, 0.16), 0 4px 10px -2px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
};
export default config;
