import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { formatShuToNumber } from "../wallet/token";
import { getTokenBalance, isKeyper } from "../service/utils";

interface User {
  address: `0x${string}` | null;
  isAKeyper: boolean | undefined;
  walletBalance: number | null | undefined;
}

export const useUser = (): User => {
  const { address } = useAccount();

  const [isAKeyper, setIsAKeyper] = useState<boolean | undefined>(false);

  /**
   * This will represent the max staking amount in Stake Modal
   */
  const [shuBalance, setShuBalance] = useState<number | null | undefined>(
    undefined
  );

  useEffect(() => {
    if (address) {
      isKeyper(address)
        .then((isKeyper: boolean) => {
          setIsAKeyper(isKeyper);
        })
        .catch((error) => {
          console.error(error);
          setIsAKeyper(undefined);
        });

      getTokenBalance(address)
        .then((balance: bigint) => {
          setShuBalance(formatShuToNumber(balance));
        })
        .catch((error) => {
          console.error(error);
          setShuBalance(undefined);
        });
    } else {
      setIsAKeyper(false);
      setShuBalance(null);
    }
  }, [address]);

  return {
    address: address || null,
    walletBalance: shuBalance,
    isAKeyper,
  };
};
