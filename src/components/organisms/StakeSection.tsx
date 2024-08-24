import { ArrowUp, CardTemplate, IconicButton } from "@/components";
import { CurrencyAmount, StakingTable } from "@/components/molecules";
import { useUser } from "@/lib/client/useUser";
import { getUserStakes } from "@/lib/service/stake";
import { CurrencyAmountStyle } from "@/types/currencyAmountStyle";
import { FormattedStake } from "@/types/formattedStake";
import { LockStatus } from "@/types/lockStatus";
import { NumberDisplaySize } from "@/types/numberDisplaySize";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface StakeSectionProps {
  onStake: () => void;
  onUnstake: (stake: FormattedStake) => void;
}

export const StakeSection = ({ onStake, onUnstake }: StakeSectionProps) => {
  const { address, walletBalance, isAKeyper } = useUser();

  /**
   * FormattedStake[]: when user stakes getter is successful
   * null: when user stakes getter is unsuccessful
   * undefined: when initialized
   */
  const [userStakes, setUserStakes] = useState<
    FormattedStake[] | undefined | null
  >(undefined);

  /**
   * number: when user stakes getter is successful and we could sum total staked balance
   * null: when user stakes getter is unsuccessful
   * undefined: when initialized
   */
  const [stakedBalance, setStakedBalance] = useState<number | undefined | null>(
    undefined
  );

  /**
   * number: when user stakes getter is successful and we could sum total unlocked
   * null: when user stakes getter is unsuccessful
   * undefined: when initialized
   */
  const [totalUnlocked, setTotalUnlocked] = useState<number | undefined | null>(
    undefined
  );

  useEffect(() => {
    if (address && isAKeyper !== undefined) {
      getUserStakes(address, isAKeyper)
        .then(setUserStakes)
        .catch(() => setUserStakes(null));
    }
  }, [address, isAKeyper]);

  useEffect(() => {
    if (Array.isArray(userStakes)) {
      if (userStakes.length) {
        setTotalUnlocked(
          userStakes.reduce(
            (acc, stake) =>
              stake.status === LockStatus.UNLOCKED ? acc + stake.amount : acc,
            0
          )
        );
        setStakedBalance(
          userStakes.reduce((acc, stake) => acc + stake.amount, 0)
        );
      } else {
        setTotalUnlocked(0);
        setStakedBalance(0);
      }
    } else if (userStakes === null) {
      setTotalUnlocked(null);
      setStakedBalance(null);
    }
  }, [userStakes]);

  return (
    <CardTemplate className="w-full flex flex-col h-full">
      <div className="grid grid-cols-5 p-6 w-full h-full gap-4 flex-grow">
        <div className="col-span-2 w-full h-full gap-3 flex flex-col items-start justify-center">
          <p className="text-base font-medium font-dm">Your Staked Balance</p>
          <div className="flex items-end gap-1">
            {typeof stakedBalance === "number" ? (
              <CurrencyAmount
                amount={stakedBalance}
                displaySize={NumberDisplaySize.Big}
                amountStyle={CurrencyAmountStyle.Primary}
              />
            ) : stakedBalance !== null ? (
              <div className="h-10 w-20 flex items-end">
                <div className="h-4 w-full bg-gray opacity-30 rounded-md flex animate-pulse"></div>
              </div>
            ) : (
              <p className="text-quaternary text-sm h-10 w-10 flex items-center">
                Error
              </p>
            )}
          </div>
          <IconicButton
            icon={<ArrowUp />}
            label={isAKeyper ? "STAKE" : "DELEGATE"}
            onClick={
              typeof walletBalance === "number"
                ? !walletBalance
                  ? () =>
                      toast.error(
                        "You need to have SHU tokens to access this functionality!"
                      )
                  : onStake
                : () =>
                    toast.error(
                      "Please try to do this action once again, shortly! We are getting your wallet balance",
                      {
                        icon: "😉",
                        id: "wallet-balance-not-get-yet",
                      }
                    )
            }
          />
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-2 w-full h-full flex gap-3 flex-col items-start justify-start">
          <p className="text-base font-medium font-dm">Total Unlocked</p>
          <div className="flex items-end gap-1">
            {typeof totalUnlocked === "number" ? (
              <CurrencyAmount
                amount={totalUnlocked}
                displaySize={NumberDisplaySize.Big}
                amountStyle={CurrencyAmountStyle.Primary}
              />
            ) : totalUnlocked !== null ? (
              <div className="h-10 w-20 flex items-end">
                <div className="h-4 w-full bg-gray opacity-30 rounded-md flex animate-pulse"></div>
              </div>
            ) : (
              <p className="text-quaternary text-sm h-10 w-10 flex items-center">
                Error
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex-grow min-h-[500px]">
        <StakingTable
          stakes={userStakes}
          openUnstakeModal={(stake: FormattedStake) => onUnstake(stake)}
        />
      </div>
    </CardTemplate>
  );
};
