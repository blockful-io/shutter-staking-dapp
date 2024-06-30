import type { Preview } from "@storybook/react";
import "../src/pages/styles/globals.css";
import "tailwindcss/tailwind.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
