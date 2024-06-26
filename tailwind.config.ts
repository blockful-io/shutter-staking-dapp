import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFF",
        secondary: "#D4ED7A",
        tertiary: "rgba(212, 237, 122, 1)",
        quaternary: "rgba(64, 180, 196, 1)",
      },
      backgroundColor: {
        primary: "#2E383E",
        secondary: "#1E282D",
        tertiary: "rgba(212, 237, 122, 0.12)",
        quaternary: "rgba(64, 180, 196, 0.12)",
      },
      borderColor: {
        primary: "#2E383E",
      },
    },
  },
  plugins: [],
};
export default config;
