import { DappHeader } from "@/components";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Shutter/DappHeader",
  component: DappHeader,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DappHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
