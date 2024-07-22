import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CardTemplate,
  IconicButton,
  NumberValue,
  ShutterCurrencySymbol,
} from "@/components";
import { StakingTable } from "@/components/molecules";
import { IconPosition } from "@/types/iconPosition";
import { NumberDisplayStyle } from "@/types/numberDisplayStyle";

interface RewardsGainedProps {
  onButtonClick: () => void;
}

export const StakeSection = ({ onButtonClick }: RewardsGainedProps) => {
  return (
    <CardTemplate className="w-full flex flex-col h-full">
      <div className="grid grid-cols-2 p-6 w-full h-full gap-4 flex-grow">
        <div className="w-full h-full gap-3 flex flex-col items-start justify-center">
          <p className="text-base font-medium font-dm">Staked Balance</p>
          <div className="flex items-end gap-1">
            <NumberValue label={130000} />
            <ShutterCurrencySymbol />
          </div>
          <IconicButton
            icon={<ArrowUp />}
            label="STAKE"
            onClick={onButtonClick}
          />
        </div>
        <div className="w-full h-full flex gap-3 flex-col items-start justify-center">
          <p className="text-base font-medium font-dm">Total Unlocked</p>
          <div className="flex items-end gap-1">
            <NumberValue
              numberDisplayStyle={NumberDisplayStyle.SecondaryNumber}
              label={52352}
            />
            <ShutterCurrencySymbol />
          </div>
          <IconicButton
            icon={<ArrowDown />}
            label="UNSTAKE"
            onClick={onButtonClick}
          />
        </div>
      </div>
      <div className="flex-grow min-h-[500px]">
        <StakingTable />
      </div>
      <IconicButton
        className="rounded-t-none"
        iconPosition={IconPosition.RIGHT}
        icon={<ArrowRight />}
        label="see more"
        onClick={onButtonClick}
      />
    </CardTemplate>
  );
};
