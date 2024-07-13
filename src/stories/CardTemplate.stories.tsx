import {
  CardTemplate,
  NumberValue,
  ShutterCurrencySymbol,
  WalletIcon,
  IconicButton,
  TrophyIcon,
  ArrowDown,
} from "@/components/atoms";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Shutter/CardTemplate",
  component: CardTemplate,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: { control: "select" },
  },
  args: { children: <></> },
} satisfies Meta<typeof CardTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptySquare: Story = {
  args: { children: <div className="w-20 h-20"></div> },
};

export const CardWithContent: Story = {
  args: {
    children: (
      <div className="p-[28px] flex flex-col">
        <WalletIcon />
        <div className="mt-5 text-base font-regular font-dm text-white">
          Wallet Balance
        </div>
        <div className="flex space-x-1 items-end mt-1">
          <NumberValue label={13500} />
          <ShutterCurrencySymbol />
        </div>
      </div>
    ),
  },
};

export const CardWithButton: Story = {
  args: {
    children: (
      <div className="p-[28px] flex flex-col w-[240px]">
        <TrophyIcon />
        <div className="mt-1 text-base font-regular font-dm text-white">
          Rewards Gained
        </div>
        <div className="flex space-x-1 items-end mt-1 mb-4">
          <NumberValue label={1100} />
          <ShutterCurrencySymbol />
        </div>
        <IconicButton
          icon={<ArrowDown />}
          label={"CLAIM"}
          onClick={() => alert("Execute claim action")}
        />
      </div>
    ),
  },
};
