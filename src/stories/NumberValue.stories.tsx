import {
  NumberDisplaySize,
  NumberValue,
  NumberDisplayStyle,
} from "@/components/atoms";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Shutter/NumberValue",
  component: NumberValue,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    numberDisplayStyle: { control: "select" },
  },
  args: { numberDisplayStyle: NumberDisplayStyle.PrimaryNumber },
} satisfies Meta<typeof NumberValue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryNumberStyle: Story = {
  args: {
    numberDisplayStyle: NumberDisplayStyle.PrimaryNumber,
    label: 130000,
  },
};

export const SecondaryNumberStyle: Story = {
  args: {
    numberDisplayStyle: NumberDisplayStyle.SecondaryNumber,
    label: 52352,
  },
};

export const BigNumber: Story = {
  args: {
    numberDisplayStyle: NumberDisplayStyle.SecondaryNumber,
    displaySize: NumberDisplaySize.Big,
    label: 52352,
  },
};

export const SmallNumber: Story = {
  args: {
    numberDisplayStyle: NumberDisplayStyle.SecondaryNumber,
    displaySize: NumberDisplaySize.Small,
    label: 52352,
  },
};
