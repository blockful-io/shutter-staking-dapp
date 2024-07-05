import {
  ShutterCurrencySymbol,
  ShutterCurrencySymbolSize,
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
    size: { control: "select" },
    style: { control: "select" },
  },
  args: {
    size: ShutterCurrencySymbolSize.Small,
    style: ShutterCurrencySymbolStyle.RegularPrimary,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SmallRegularPrimary: Story = {
  args: {
    size: ShutterCurrencySymbolSize.Small,
    style: ShutterCurrencySymbolStyle.RegularPrimary,
  },
};

export const BigHighlightedPrimary: Story = {
  args: {
    size: ShutterCurrencySymbolSize.Big,
    style: ShutterCurrencySymbolStyle.HighlightedPrimary,
  },
};

export const BigRegularPrimary: Story = {
  args: {
    size: ShutterCurrencySymbolSize.Big,
    style: ShutterCurrencySymbolStyle.RegularPrimary,
  },
};

export const SmallRegularSecondary: Story = {
  args: {
    size: ShutterCurrencySymbolSize.Small,
    style: ShutterCurrencySymbolStyle.RegularSecondary,
  },
};
