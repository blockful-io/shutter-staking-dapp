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
    buttonLabel: { control: "text" },
    children: { control: "select" },
    isOpen: { control: "boolean" },
  },
  args: {
    title: "Stake $SHU Tokens",
    children: <></>,
    isOpen: true,
    onClose: () => {},
    onMainCtaClick: () => {},
    buttonLabel: "stake",
  },
} satisfies Meta<typeof GenericModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenedModal: Story = {};

export const ModalWithContent: Story = {
  args: {
    children: (
      <div>
        <NumberInputSlider />
      </div>
    ),
  },
};

export const ModalWithoutTitle: Story = {
  args: {
    title: "",
  },
};

export const ModalWithCustomTitle: Story = {
  args: {
    title: "My custom title",
  },
};

export const ModalWithCustomActionOnClose: Story = {
  args: {
    onClose: () => alert("Close modal action executed"),
  },
};

export const ModalWithCustomActionOnCtaClick: Story = {
  args: {
    onMainCtaClick: () => alert("Stake action executed"),
  },
};

export const ModalWithCustomCtaLabel: Story = {
  args: {
    buttonLabel: "My custom label",
  },
};

export const ClosedModal: Story = {
  args: {
    isOpen: false,
  },
};
