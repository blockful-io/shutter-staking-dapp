import { Meta, StoryObj } from "@storybook/react";
import { StakesTable } from "@/components/organisms";

const meta: Meta<typeof StakesTable> = {
  title: "Shutter/StakesTable",
  component: StakesTable,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
