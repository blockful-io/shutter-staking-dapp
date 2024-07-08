import type { Preview } from "@storybook/react";
import "@/styles/globals.css";
import "tailwindcss/tailwind.css";
import "@rainbow-me/rainbowkit/styles.css";
import { withWagmiProvider } from "./decorators";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withWagmiProvider],
};

export default preview;
