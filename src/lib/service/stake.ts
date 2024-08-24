import {
  getBlockchainTransactionError,
  TransactionErrorType,
} from "../wallet/txError";
import { formatNumberToShu, formatShuToNumber } from "../wallet/token";
import { LockStatus } from "@/types/lockStatus";
import { FormattedStake } from "@/types/formattedStake";
import {
  DELEGATE_CONTRACT_ADDRESS,
  getDelegateContract,
  getStakingContract,
  getTokenContract,
  STAKING_CONTRACT_ADDRESS,
} from "./contracts";

/**
 * @param stake: Array<any>. A stake, as it was received from the blockchain, to be parsed to an understandable type.
 * @param stakeId: number. The id of the stake.
 * @returns: FormattedStake. The stake parsed to an understandable type.
 */
const parseStake = (
  stake: Array<any>,
  stakeId: number,
  isAKeyper: boolean,
  userAddress: `0x${string}`
): FormattedStake => {
  let keyper: `0x${string}`;
  let amount: number;
  let timestampInSeconds: number;
  let lockPeriod: number;

  if (isAKeyper) {
    keyper = userAddress;
    amount = formatShuToNumber(stake[0]);
    timestampInSeconds = stake[1];
    lockPeriod = stake[2];
  } else {
    keyper = stake[0];
    amount = formatShuToNumber(stake[1]);
    timestampInSeconds = stake[2];
    lockPeriod = stake[3];
  }

  const timestampInMs = Number(timestampInSeconds) * 1000;
  const lockPeriodInMs = Number(lockPeriod) * 1000;

  const status =
    timestampInMs + lockPeriodInMs > Date.now()
      ? LockStatus.LOCKED
      : LockStatus.UNLOCKED;

  return {
    keyper,
    amount,
    status,
    id: stakeId.toString(),
    unlockDate: Number(timestampInMs + lockPeriodInMs),
  };
};

/**
 * We cannot type the contract yet since there is no common response to Viem's getContract function.
 * @param stakeIds: Array<number>. The ids of the stakes to be parsed.
 * @param contract: any. The contract to be used to get the stakes (either Delegate or Staking contract).
 * @returns FormattedStake[]. The stakes parsed to an understandable data type.
 */
export const parseStakes = async (
  stakeIds: Array<number>,
  contract: any,
  isAKeyper: boolean,
  userAddress: `0x${string}`
): Promise<FormattedStake[]> => {
  const stakeGetters = stakeIds.map(
    async (id) => await contract.read.stakes([id])
  );

  const stakes = await Promise.all(stakeGetters);

  const formattedStakes = stakes.map((stake, idx) =>
    parseStake(stake, stakeIds[idx], isAKeyper, userAddress)
  );

  return formattedStakes;
};

/**
 * @param address: `0x${string}`. The address of the user.
 * @param isAKeyper: boolean. If the user is a keyper or not.
 * @returns: FormattedStake[]. The stakes of the user.
 */
export const getUserStakes = async (
  address: `0x${string}`,
  isAKeyper: boolean
): Promise<FormattedStake[]> => {
  if (isAKeyper) {
    const contract = await getStakingContract(address);
    const stakeIds = await contract.read.getUserStakeIds([address]);

    if (!Array.isArray(stakeIds)) {
      throw new Error(
        "Invalid response from Delegate contract: getUserStakeIds"
      );
    }

    if (stakeIds.length === 0) {
      return [];
    }

    const parsedStakes = parseStakes(stakeIds, contract, isAKeyper, address);

    return parsedStakes;
  } else {
    const contract = await getDelegateContract(address);
    const stakeIds = await contract.read.getUserStakeIds([address]);

    if (!Array.isArray(stakeIds)) {
      throw new Error(
        "Invalid response from Delegate contract: getUserStakeIds"
      );
    }

    if (stakeIds.length === 0) {
      return [];
    }

    const parsedStakes = parseStakes(stakeIds, contract, isAKeyper, address);

    return parsedStakes;
  }
};

/**
 * Returns the lock period of any stake done in the official Shutter Staking contracts.
 * @param address: `0x${string}`. The address of the user.
 * @returns: string. The lock period in years, months, weeks or days, of any stake done in
 * the official Shutter Staking contracts.
 */
export const getStakingLockPeriod = async (
  address: `0x${string}`
): Promise<string> => {
  const contract = await getStakingContract(address);
  const lockPeriod = await contract.read.lockPeriod();

  let lockPeriodInDays,
    lockPeriodInWeeks,
    lockPeriodInMonths,
    lockPeriodInYears;
  try {
    const lockPeriodNumber = Number(lockPeriod);

    lockPeriodInDays = lockPeriodNumber / 60 / 60 / 24;
    lockPeriodInWeeks = lockPeriodInDays / 7;
    lockPeriodInMonths = lockPeriodInWeeks / 4;
    lockPeriodInYears = lockPeriodInMonths / 12;
  } catch (error) {
    throw new Error("Invalid response from Staking contract: lockPeriod");
  }

  if (lockPeriodInYears) return Math.round(lockPeriodInYears) + " years";
  else if (lockPeriodInMonths)
    return Math.round(lockPeriodInMonths) + " months";
  else if (lockPeriodInWeeks) return Math.round(lockPeriodInWeeks) + " weeks";
  else return Math.round(lockPeriodInDays) + " days";
};

/**
 * @param addressThatTheoricallyApproved: `0x${string}`. The address that theoretically approved the tokens.
 * @param addressOfContractThatHasAllowance: `0x${string}`. The address of the contract that has the allowance.
 * @returns: bigint. The actual amount of tokens approved to be transacted by the addressOfContractThatHasAllowance.
 */
export const hasNTokensApproved = async (
  addressThatTheoricallyApproved: `0x${string}`,
  addressOfContractThatHasAllowance: `0x${string}`
): Promise<bigint> => {
  const contract = await getTokenContract(addressThatTheoricallyApproved);
  const allowance = await contract.read.allowance([
    addressThatTheoricallyApproved,
    addressOfContractThatHasAllowance,
  ]);

  if (typeof allowance !== "bigint") {
    throw new Error("Invalid response from Token contract: allowance");
  }

  return allowance;
};

/**
 * This approval is needed to stake SHU in the Staking or Delegate contracts.
 * @param isAKeyper: boolean. If the owner of the tokens is a keyper or not.
 * @param stakingAmount: number. The amount of SHU to be approved.
 * @param ownerOfTokens: `0x${string}`. The address of the owner of the tokens.
 * @returns: `0x${string}` | TransactionErrorType. The transaction hash or the error type.
 */
export const approveAmount = async (
  isAKeyper: boolean,
  stakingAmount: number,
  ownerOfTokens: `0x${string}`
): Promise<`0x${string}` | TransactionErrorType> => {
  let addressOfContractToInteractWith: `0x${string}` | null = null;
  if (isAKeyper) {
    addressOfContractToInteractWith = STAKING_CONTRACT_ADDRESS;
  } else {
    addressOfContractToInteractWith = DELEGATE_CONTRACT_ADDRESS;
  }

  const stakingAmountTransformed = formatNumberToShu(stakingAmount);

  const tokenContract = await getTokenContract(ownerOfTokens, true);
  const stakeArgs = [addressOfContractToInteractWith, stakingAmountTransformed];

  try {
    const balanceAlreadyApproved = await hasNTokensApproved(
      ownerOfTokens,
      addressOfContractToInteractWith
    );

    const hasAlreadyApprovedEnough =
      balanceAlreadyApproved >= stakingAmountTransformed;

    if (hasAlreadyApprovedEnough) {
      return TransactionErrorType.NOT_NEEDED;
    }

    const approveAmount = await tokenContract.write.approve(stakeArgs);

    return approveAmount;
  } catch (error) {
    const errorType = getBlockchainTransactionError(error);
    return errorType;
  }
};

/**
 *  Non-keypers will always be able to stake 1 SHU or more.
 *  Keyper's minimum stake amount is defined by the Staking contract:
 *  - If the user has already staked more than the minimum amount, the minimum stake amount is 1 SHU.
 *  - If the user has not staked more than the minimum amount, the minimum stake amount is the minimum amount
 *    defined by the Staking contract.
 * @param address: `0x${string}`. The address of the user.
 * @param isAKeyper: boolean. If the address is a keyper or not.
 * @returns number. The minimum amount of SHU that can be staked.
 */
export const getStakingMinStakeAmount = async (
  address: `0x${string}`,
  isAKeyper: boolean
): Promise<number> => {
  if (isAKeyper) {
    const contract = await getStakingContract(address);
    const minStakeAmount = await contract.read.minStake();
    const userStakes = await getUserStakes(address, isAKeyper);

    try {
      BigInt(minStakeAmount as string);
    } catch (error) {
      throw new Error("Invalid response from Staking contract: minStake");
    }

    if (
      userStakes.some(
        (stake) =>
          stake.amount >= formatShuToNumber(BigInt(minStakeAmount as string))
      )
    ) {
      return 1;
    } else {
      return Math.ceil(formatShuToNumber(BigInt(minStakeAmount as string)));
    }
  } else {
    return 1;
  }
};

/**
 * Returns the minimum amount of SHU that can be staked by the given address.
 * @param address: `0x${string}`. The address of the authenticate user.
 * @returns: number. The minimum amount of SHU that can be staked by the given address.
 */
export const getStakingContractMinStakeAmount = async (
  address: `0x${string}`
): Promise<number> => {
  const contract = await getStakingContract(address);
  const minStakeAmount = await contract.read.minStake();

  try {
    BigInt(minStakeAmount as string);
  } catch (error) {
    throw new Error("Invalid response from Staking contract: minStake");
  }

  return Math.ceil(formatShuToNumber(BigInt(minStakeAmount as string)));
};

/**
 * Stakes the given amount of SHU for the given address.
 * If the address is a keyper, the amount is staked in the Staking contract.
 * If the address is not a keyper, the amount is staked in the Delegate contract.
 * @param address: `0x${string}`. The address of the user.
 * @param stakingAmount: number. The amount of SHU to be staked.
 * @param keyper: `0x${string}`. The address of the keyper.
 * @param isAKeyper: boolean. If the user is a keyper or not.
 * @returns: `0x${string}` | TransactionErrorType. The transaction hash or the error type.
 */
export const stake = async (
  address: `0x${string}`,
  stakingAmount: number,
  keyper: `0x${string}`,
  isAKeyper: boolean
): Promise<`0x${string}` | TransactionErrorType> => {
  const formattedStakeAmount = formatNumberToShu(stakingAmount);

  if (isAKeyper) {
    const stakingContract = await getStakingContract(address, true);
    try {
      const stakeArgs = [formattedStakeAmount];
      const stakeCreationResponse =
        await stakingContract.write.stake(stakeArgs);

      return stakeCreationResponse;
    } catch (error) {
      const errorType = getBlockchainTransactionError(error);
      return errorType;
    }
  } else {
    const delegateContract = await getDelegateContract(address, true);
    const stakeArgs = [keyper, formattedStakeAmount];

    try {
      const stakeCreationResponse =
        await delegateContract.write.stake(stakeArgs);

      return stakeCreationResponse;
    } catch (error) {
      const errorType = getBlockchainTransactionError(error);
      return errorType;
    }
  }
};
