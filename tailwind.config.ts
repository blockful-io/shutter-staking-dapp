import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gray: "#B3B4B9",
        primary: "#FFF",
        brandBlack: "#1E282D",
        brandColor: "rgb(0,68,164)",
        quaternary: "rgba(64, 180, 196, 1)",
      },
      backgroundColor: {
        primary: "#2E383E",
        secondary: "#1E282D",
        black03: "rgba(46, 56, 62, 1)",
        brandColor: "rgb(0, 68, 164)",
        tertiary: "rgba(0, 68, 164, 0.12)",
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
