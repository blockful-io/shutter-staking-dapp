import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { getRewardsAmountForAddress } from "../service/rewards";

export const useRewards = () => {
  const { address, isAKeyper } = useUser();
  const [rewardsAvailable, setRewardsAvailable] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (address && typeof isAKeyper !== "undefined") {
      getRewardsAmountForAddress(address, isAKeyper)
        .then((rewardsAmount: number) => setRewardsAvailable(rewardsAmount))
        .catch((error) => {
          console.error(error);
          setRewardsAvailable(undefined);
        });
    } else {
      setRewardsAvailable(0);
    }
  }, [address, isAKeyper]);

  return {
    rewardsAvailable,
  };
};
