import { ShutterCurrencySymbol } from "@/components/01-atoms";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Shutter/ShutterCurrencySymbol",
  component: ShutterCurrencySymbol,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ShutterCurrencySymbol>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
