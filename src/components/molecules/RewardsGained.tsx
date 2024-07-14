import {
  ArrowUp,
  CardTemplate,
  IconicButton,
  NumberValue,
  ShutterCurrencySymbol,
  TrophyIcon,
} from "@/components";

interface RewardsGainedProps {
  onButtonClick: () => void;
}

export const RewardsGained = ({ onButtonClick }: RewardsGainedProps) => {
  return (
    <CardTemplate className="flex flex-col">
      <div className="h-full p-[28px] flex flex-col justify-between">
        <TrophyIcon />
        <div className="mt-1 text-base font-regular font-dm text-white">
          Rewards Gained
        </div>
        <div className="flex space-x-1 items-end mt-1 mb-4">
          <NumberValue label={1100} />
          <ShutterCurrencySymbol />
        </div>
        <IconicButton
          icon={<ArrowUp />}
          label="CLAIM"
          onClick={onButtonClick}
        />
      </div>
    </CardTemplate>
  );
};
