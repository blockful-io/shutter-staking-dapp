import { ShutterCurrencySymbolStyle } from "@/components";
import { Meta, StoryObj } from "@storybook/react";
import { ShutterCurrencySymbol } from "@/components/atoms";

const meta: Meta<typeof ShutterCurrencySymbol> = {
  title: "Shutter/ShutterCurrencySymbol",
  component: ShutterCurrencySymbol,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    style: { control: "select" },
  },
  args: {
    style: ShutterCurrencySymbolStyle.RegularPrimary,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const RegularPrimary: Story = {
  args: {
    style: ShutterCurrencySymbolStyle.RegularPrimary,
  },
};

export const HighlightedPrimary: Story = {
  args: {
    style: ShutterCurrencySymbolStyle.HighlightedPrimary,
  },
};

export const RegularSecondary: Story = {
  args: {
    style: ShutterCurrencySymbolStyle.RegularSecondary,
  },
};

export const HighlightedSecondary: Story = {
  args: {
    style: ShutterCurrencySymbolStyle.HighlightedSecondary,
  },
};
