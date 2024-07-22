import { LockStatusBadge } from "@/components/atoms";
import { LockStatus } from "@/types/lockStatus";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Shutter/LockStatusBadge",
  component: LockStatusBadge,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    status: { control: "select" },
  },
  args: { status: LockStatus.LOCKED },
} satisfies Meta<typeof LockStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UnlockedBadge: Story = {
  args: { status: LockStatus.UNLOCKED },
};

export const LockedBadge: Story = {
  args: { status: LockStatus.LOCKED },
};
