import {
  ShutterCurrencySymbol,
  ShutterCurrencySymbolStyle,
} from "@/components";
import { Meta, StoryObj } from "@storybook/react";

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

export const SmallRegularPrimary: Story = {
  args: {
    style: ShutterCurrencySymbolStyle.RegularPrimary,
  },
};

export const BigHighlightedPrimary: Story = {
  args: {
    style: ShutterCurrencySymbolStyle.RegularPrimary,
  },
};

export const BigRegularPrimary: Story = {
  args: {
    style: ShutterCurrencySymbolStyle.RegularSecondary,
  },
};
