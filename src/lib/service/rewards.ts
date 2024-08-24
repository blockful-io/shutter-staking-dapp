import { formatNumberToShu, formatShuToNumber } from "../wallet/token";
import {
  getBlockchainTransactionError,
  TransactionErrorType,
} from "../wallet/txError";
import {
  DELEGATE_CONTRACT_ADDRESS,
  getDelegateContract,
  getRewardsContract,
  getStakingContract,
  STAKING_CONTRACT_ADDRESS,
} from "./contracts";
import {
  getDelegateContractBalanceOfStakedShu,
  getDelegateContractTotalSupply,
  getStakingContractBalanceOfStakedShu,
  getStakingContractTotalSupply,
  isKeyper,
} from "./utils";

/**
 * @param address: `0x${string}`. Address of the user.
 * @returns: Promise<number>. The rewards distribution configuration.
 */
export const getRewardsDistributionConfiguration = async (
  address: `0x${string}`
) => {
  const contract = await getRewardsContract(address);
  const rewardConfiguration = await contract.read.rewardConfigurations();

  return rewardConfiguration;
};

export const getExpectedRewards = async (
  address: `0x${string}`,
  stakingAmount: number
): Promise<number> => {
  const isAKeyper = await isKeyper(address);

  let totalSupply: number | null = null;
  let totalAssets: number | null = null;

  const rewardsContract = await getRewardsContract(address);

  if (isAKeyper) {
    totalSupply = await getStakingContractTotalSupply(address);
    totalAssets = await getStakingContractBalanceOfStakedShu(address);
    const rewardsDistributed = await rewardsContract.read.rewardConfigurations([
      DELEGATE_CONTRACT_ADDRESS,
    ]);

    const emissionRate =
      rewardsDistributed && Array.isArray(rewardsDistributed)
        ? rewardsDistributed[0]
        : undefined;

    try {
      Number(emissionRate);
    } catch (error) {
      throw new Error("Invalid response from Rewards contract: emissionRate");
    }

    const expectedRewards =
      (stakingAmount * (totalSupply + 1)) /
      (totalAssets + Number(emissionRate) + 1);

    return expectedRewards;
  } else {
    totalSupply = await getDelegateContractTotalSupply(address);
    totalAssets = await getDelegateContractBalanceOfStakedShu(address);
    const rewardsDistributed = await rewardsContract.read.rewardConfigurations([
      STAKING_CONTRACT_ADDRESS,
    ]);

    const emissionRate =
      rewardsDistributed && Array.isArray(rewardsDistributed)
        ? rewardsDistributed[0]
        : undefined;

    try {
      Number(emissionRate);
    } catch (error) {
      throw new Error("Invalid response from Rewards contract: emissionRate");
    }

    const expectedRewards =
      (stakingAmount * (totalSupply + 1)) /
      (totalAssets + Number(emissionRate) + 1);

    return expectedRewards;
  }
};

/**
 * @param address: `0x${string}`. Address of the user.
 * @param isAKeyper: boolean. Whether the user is a keyper or not.
 * @returns: Promise<number>. The rewards amount the user can claim.
 */
export const getRewardsAmountForAddress = async (
  address: `0x${string}`,
  isAKeyper: boolean
): Promise<number> => {
  let rewardsAmount: number | null = null;

  let lockedAmount: number, assetsAmount: number;

  if (isAKeyper) {
    const contract = await getStakingContract(address);

    try {
      const userBalance = await contract.read.balanceOf([address]);
      const assets = await contract.read.convertToAssets([userBalance]);
      const locked = await contract.read.totalLocked([address]);

      lockedAmount = Number(locked);
      assetsAmount = Number(assets);
    } catch {
      const keyperStakes = await contract.read.getUserStakeIds([address]);

      if (Array.isArray(keyperStakes) && keyperStakes?.length === 0) {
        return 0;
      } else {
        throw new Error("Invalid response from Staking contract: maxWithdraw");
      }
    }
  } else {
    const contract = await getDelegateContract(address);

    try {
      const userBalance = await contract.read.balanceOf([address]);
      const assets = await contract.read.convertToAssets([userBalance]);
      const locked = await contract.read.totalLocked([address]);

      lockedAmount = Number(locked);
      assetsAmount = Number(assets);
    } catch {
      const keyperStakes = await contract.read.getUserStakeIds([address]);

      if (Array.isArray(keyperStakes) && keyperStakes?.length === 0) {
        return 0;
      } else {
        throw new Error("Invalid response from Staking contract: maxWithdraw");
      }
    }
  }

  const maxWithdrawRes =
    lockedAmount >= assetsAmount ? 0 : assetsAmount - lockedAmount;

  try {
    BigInt(maxWithdrawRes);
  } catch (error) {
    throw new Error("Invalid response from Rewards contract: rewardsAmounts");
  }

  rewardsAmount = formatShuToNumber(BigInt(maxWithdrawRes));

  return rewardsAmount;
};

/**
 * The transaction to claim rewards.
 * @param address: `0x${string}`. Address of the user.
 * @returns: Promise<`0x${string}` | TransactionErrorType>. The response from the blockchain.
 */
export const claimRewards = async (
  address: `0x${string}`,
  isAKeyper: boolean,
  amountToClaim: number
): Promise<`0x${string}` | TransactionErrorType> => {
  try {
    if (isAKeyper) {
      const contract = await getStakingContract(address, true);
      const claimRewardsRes = await contract.write.claimRewards([
        formatNumberToShu(amountToClaim),
      ]);

      return claimRewardsRes;
    } else {
      const contract = await getDelegateContract(address);
      const claimRewardsRes = await contract.write.claimRewards([
        formatNumberToShu(amountToClaim),
      ]);

      return claimRewardsRes;
    }
  } catch (error) {
    const errorType = getBlockchainTransactionError(error);
    return errorType;
  }
};
