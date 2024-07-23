import { ArrowDown, IconicButton, PlusIcon } from "@/components/atoms";
import { IconPosition } from "@/types/iconPosition";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Shutter/IconicButton",
  component: IconicButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { control: "select" },
  },
  args: { icon: <ArrowDown />, label: "Label", onClick: () => {} },
} satisfies Meta<typeof IconicButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonWithIconInTheLeft: Story = {
  args: { icon: <ArrowDown />, label: "ANY LABEL WANTED", onClick: () => {} },
};

export const ButtonWithIconInTheRight: Story = {
  args: {
    icon: <ArrowDown />,
    label: "ANY LABEL WANTED",
    onClick: () => {},
    iconPosition: IconPosition.RIGHT,
  },
};

export const StakeButtonExample: Story = {
  args: {
    icon: <ArrowDown />,
    label: "STAKE",
    onClick: () => alert("Execute stake action"),
  },
};

export const UnstakeButtonExample: Story = {
  args: {
    icon: (
      <div className="transform rotate-180">
        <ArrowDown />
      </div>
    ),
    label: "UNSTAKE",
    onClick: () => alert("Execute unstake action"),
  },
};

export const ClaimButtonExample: Story = {
  args: {
    icon: <ArrowDown />,
    label: "CLAIM",
    onClick: () => alert("Execute claim action"),
  },
};

export const DelegateButtonExample: Story = {
  args: {
    icon: <PlusIcon />,
    label: "DELEGATE",
    onClick: () => alert("Execute delegate action"),
  },
};

export const SeeMoreButtonExample: Story = {
  args: {
    icon: (
      <div className="transform -rotate-90">
        <ArrowDown />
      </div>
    ),
    label: "SEE MORE",
    onClick: () => alert("Execute see more action"),
    iconPosition: IconPosition.RIGHT,
  },
};
