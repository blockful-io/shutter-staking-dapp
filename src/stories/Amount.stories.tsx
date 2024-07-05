import { NumberDisplayStyle } from "@/components/atoms";
import { Amount } from "@/components/molecules";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Shutter/Amount",
  component: Amount,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    numberDisplayStyle: { control: "select" },
  },
  args: { numberDisplayStyle: NumberDisplayStyle.PrimaryNumber },
} satisfies Meta<typeof Amount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryAmountStyle: Story = {};
