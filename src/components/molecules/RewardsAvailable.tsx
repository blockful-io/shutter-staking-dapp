import {
  ArrowUp,
  CardTemplate,
  CurrencyAmount,
  IconicButton,
  TrophyIcon,
} from "@/components";
import { useRewards } from "@/lib/client/useRewards";
import { NumberDisplaySize } from "@/types/numberDisplaySize";

interface RewardsAvailableProps {
  onClaim: () => void;
}

export const RewardsAvailable = ({ onClaim }: RewardsAvailableProps) => {
  const { rewardsAvailable } = useRewards();

  return (
    <CardTemplate className="flex flex-col">
      <div className="h-full p-7 flex flex-col justify-between">
        <TrophyIcon />
        <div className="flex flex-col justify-end">
          <div className="order-2 mt-1 text-base font-regular font-dm text-white">
            Rewards Available
          </div>
          <div className="order-3 flex space-x-1 items-end mt-1">
            {typeof rewardsAvailable === "number" ? (
              <CurrencyAmount
                amount={rewardsAvailable}
                displaySize={NumberDisplaySize.Big}
              />
            ) : rewardsAvailable !== null ? (
              <div className="h-10 w-20 flex items-end">
                <div className="h-4 w-full bg-gray opacity-30 rounded-md flex animate-pulse"></div>
              </div>
            ) : (
              <p className="text-quaternary text-sm h-10 w-10 flex items-center">
                Error
              </p>
            )}
          </div>
          {rewardsAvailable ? (
            <div className="order-4 mt-4">
              <IconicButton
                label="CLAIM"
                icon={<ArrowUp />}
                onClick={onClaim}
              />
            </div>
          ) : (
            <div className="w-full h-[54px] order-1"></div>
          )}
        </div>
      </div>
    </CardTemplate>
  );
};
