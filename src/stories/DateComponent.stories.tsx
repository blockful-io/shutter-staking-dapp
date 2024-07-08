import { DateComponent } from "@/components/atoms/DateComponent";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DateComponent> = {
  title: "Shutter/DateComponent",
  component: DateComponent,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    timestamp: {
      control: {
        type: "number",
      },
    },
  },
  args: {
    timestamp: Date.now(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const NowDate: Story = {
  args: {
    timestamp: Date.now(),
  },
};

export const SpecificDate: Story = {
  args: {
    timestamp: new Date("2022-12-31").getTime(),
  },
};
