import { GenericModal, NumberInputSlider } from "@/components";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Shutter/GenericModal",
  component: GenericModal,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: { control: "text" },
    children: { control: "select" },
    isOpen: { control: "boolean" },
  },
  args: {
    title: "",
    children: <></>,
    isOpen: true,
    onClose: () => {},
  },
} satisfies Meta<typeof GenericModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenedModal: Story = {};

export const OpenedModalWithContent: Story = {
  args: {
    children: (
      <div>
        <NumberInputSlider />
      </div>
    ),
  },
};

export const OpenedModalWithContentAndTitle: Story = {
  args: {
    title: "Number Input Slider",
    children: (
      <div>
        <NumberInputSlider />
      </div>
    ),
  },
};

export const ClosedModal: Story = {
  args: {
    isOpen: false,
  },
};
