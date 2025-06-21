import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#163300",
        secondary: "#FFC091",
        "dark-subtle": "rgba(255, 255, 255, 0.5)",
        "light-subtle": "rgba(39, 39, 39, 0.5)",
        "highlight-dark": "#ffc220",
        "highlight-light": "#ffc220",
      }
    },
    screens: {
      xs: { max: "320px" },
      xm: { min: "321px", max: "480px" },
      sm: { min: "481px", max: "768px" },
      md: { min: "769px", max: "1024px" },
      lg: { min: "1025px", max: "1490px" },
      xl: { min: "1491px" },
      // Additional utility breakpoints
      "max-xs": { max: "320px" },
      "max-xm": { max: "480px" },
      "max-sm": { max: "768px" },
      "max-md": { max: "1024px" },
    }
  },
  plugins: [],
};
export default config;
