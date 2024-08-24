import { FormattedStake } from "@/types/formattedStake";
import {
  getBlockchainTransactionError,
  TransactionErrorType,
} from "../wallet/txError";
import { isKeyper } from "./utils";
import { getDelegateContract, getStakingContract } from "./contracts";

/**
 * @param address: `0x${string}`. Address of the user.
 * @param stake: FormattedStake. The stake to be unstaked.
 * @returns: Promise<`0x${string}` | TransactionErrorType>. The response from the blockchain.
 */
export const unstakeFromAddress = async (
  address: `0x${string}`,
  stake: FormattedStake
): Promise<`0x${string}` | TransactionErrorType> => {
  const isAKeyper = await isKeyper(address);

  if (isAKeyper) {
    const stakingContract = await getStakingContract(address, true);
    /**
     * When 0 is passed as the third argument, 100% of the stake amount is unstaked
     */
    const unstakeArgs = [stake.keyper, stake.id, 0];

    try {
      const stakeRemovalResponse =
        await stakingContract.write.unstake(unstakeArgs);

      return stakeRemovalResponse;
    } catch (error) {
      const errorType = getBlockchainTransactionError(error);
      return errorType;
    }
  } else {
    const delegateContract = await getDelegateContract(address, true);
    /**
     * When 0 is passed as the third argument, 100% of the stake amount is unstaked
     */
    const unstakeArgs = [stake.id, 0];

    try {
      const stakeRemovalResponse =
        await delegateContract.write.unstake(unstakeArgs);

      return stakeRemovalResponse;
    } catch (error) {
      const errorType = getBlockchainTransactionError(error);
      return errorType;
    }
  }
};
