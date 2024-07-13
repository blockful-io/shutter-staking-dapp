import { NumberInputSlider } from "@/components";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Shutter/NumberInputSlider",
  component: NumberInputSlider,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof NumberInputSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NumberInputControlledByTextAndSlider: Story = {};
