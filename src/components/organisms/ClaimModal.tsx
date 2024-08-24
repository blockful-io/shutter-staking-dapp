/* eslint-disable react-hooks/exhaustive-deps */
import { CurrencyAmount, GenericModal, NumberInputSlider } from "../molecules";
import toast from "react-hot-toast";
import { TransactionErrorType } from "@/lib/wallet/txError";
import { NumberDisplaySize } from "@/types/numberDisplaySize";
import { useUser } from "@/lib/client/useUser";
import { useRewards } from "@/lib/client/useRewards";
import { useState } from "react";
import { claimRewards } from "@/lib/service/rewards";

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClaimModal = ({ isOpen, onClose }: ClaimModalProps) => {
  const { address, isAKeyper } = useUser();
  const { rewardsAvailable } = useRewards();

  const [hasClaimed, setHasClaimed] = useState<boolean>(false);
  const [amountToClaim, setAmountToClaim] = useState<number>(0);

  const claim = (): Promise<`0x${string}` | TransactionErrorType> => {
    if (!address) {
      toast.error("Not possible to unstake without signed-in user");
      throw new Error("Not possible to stake without signed-in user");
    }

    if (typeof isAKeyper === "undefined") {
      toast.error(
        "Not possible to unstake without signed-in user keyper definition"
      );
      throw new Error(
        "Not possible to stake without signed-in user keyper definition"
      );
    }

    return claimRewards(address, isAKeyper, amountToClaim);
  };

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title="Claim rewards"
      communicateMainCtaTxSuccess={() => setHasClaimed(true)}
      buttonLabel={hasClaimed ? "Finish Rewards claiming" : undefined}
      onMainCtaClick={
        hasClaimed
          ? () => {
              toast.loading("Refresh the page to see updated data");
              return new Promise(onClose);
            }
          : claim
      }
    >
      <NumberInputSlider
        label="Amount to claim"
        maxAmount={rewardsAvailable}
        onAmountChange={(num) => setAmountToClaim(num)}
      />
    </GenericModal>
  );
};
