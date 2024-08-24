import { FormattedStake } from "@/types/formattedStake";
import { isAddress } from "viem";
import { parseStakes } from "./stake";
import {
  DELEGATE_CONTRACT_ADDRESS,
  getDelegateContract,
  getStakingContract,
  getTokenContract,
  STAKING_CONTRACT_ADDRESS,
} from "./contracts";

export interface KeyperData {
  address: `0x${string}`;
  stakes: FormattedStake[];
  stakesSummedAmount: number;
}

/**
 * @param address: `0x${string}`. Address of the user.
 * @returns: Promise<boolean>. Whether the user is a keyper or not.
 */
export const isKeyper = async (address: `0x${string}`): Promise<boolean> => {
  const contract = await getStakingContract(address);
  const isKeyper = await contract.read.keypers([address]);

  if (typeof isKeyper !== "boolean") {
    throw new Error("Invalid response from Staking contract: isKeyper");
  }

  return isKeyper;
};

/**
 * @param address: `0x${string}`. Address of the user.
 * @returns: Promise<number>. The user's balance of SHU.
 */
export const getTokenBalance = async (
  address: `0x${string}`
): Promise<bigint> => {
  const contract = await getTokenContract(address);
  const balance = await contract.read.balanceOf([address]);

  try {
    BigInt(balance as string);
  } catch (error) {
    throw new Error("Invalid response from Token contract: getTokenBalance");
  }
  return BigInt(balance as string);
};

export const getStakingContractTotalSupply = async (
  address: `0x${string}`
): Promise<number> => {
  const contract = await getStakingContract(address);
  const balance = await contract.read.totalSupply();

  try {
    Number(balance);
  } catch (error) {
    throw new Error("Invalid response from Staking contract: totalSupply");
  }

  return Number(balance);
};

/**
 * @param address: `0x${string}`. Address of the user.
 * @returns: Promise<number>. The balance of staked SHU in the Staking contract.
 */
export const getStakingContractBalanceOfStakedShu = async (
  address: `0x${string}`
): Promise<number> => {
  const tokenContract = await getTokenContract(address);
  const balance = await tokenContract.read.balanceOf([
    STAKING_CONTRACT_ADDRESS,
  ]);

  try {
    Number(balance);
  } catch (error) {
    throw new Error(
      "Invalid resSTAKING_CONTRACT_ADDRESSponse from Token contract: balance"
    );
  }

  return Number(balance);
};

/**
 * @param address: `0x${string}`. Address of the user.
 * @returns: Promise<number>. The total supply of the Delegate contract.
 */
export const getDelegateContractTotalSupply = async (
  address: `0x${string}`
): Promise<number> => {
  const contract = await getDelegateContract(address);
  const balance = await contract.read.totalSupply();

  return Number(balance);
};

/**
 * @param address: `0x${string}`. Address of the user.
 * @returns: Promise<number>. The balance of staked SHU in the Delegate contract.
 */
export const getDelegateContractBalanceOfStakedShu = async (
  address: `0x${string}`
): Promise<number> => {
  const tokenContract = await getTokenContract(address);
  const balance = await tokenContract.read.balanceOf([
    DELEGATE_CONTRACT_ADDRESS,
  ]);

  try {
    Number(balance);
  } catch (error) {
    throw new Error("Invalid response from Token contract: balanceOf");
  }

  return Number(balance);
};

/**
 * @param address: `0x${string}`. Address of the user.
 * @param isAKeyper: boolean. Whether the user is a keyper or not.
 * @returns: Promise<number>. The conversion rate of SHU to staked SHU.
 */
export const getShuToStakedShuConversionRate = async (
  address: `0x${string}`,
  isAKeyper: boolean
): Promise<number> => {
  let totalSupply: number | null = null;
  let totalAssets: number | null = null;

  const shuToConvert = 1 ** 18;

  if (isAKeyper) {
    totalSupply = await getStakingContractTotalSupply(address);
    totalAssets = await getStakingContractBalanceOfStakedShu(address);
  } else {
    totalSupply = await getDelegateContractTotalSupply(address);
    totalAssets = await getDelegateContractBalanceOfStakedShu(address);
  }

  const scaledConversion: number = shuToConvert * totalSupply;
  const conversionRate: number = scaledConversion
    ? scaledConversion / totalAssets
    : 0;

  return conversionRate === 0 ? 1 : conversionRate;
};

/**
 * @returns Promise<`0x${string}`[]>. The list of keypers addresses.
 */
export const getKeypers = async (): Promise<`0x${string}`[]> => {
  const keypersApiEndpoint = process.env.NEXT_PUBLIC_KEYPERS_API_ENDPOINT;

  if (!keypersApiEndpoint) {
    throw new Error("Keyper API endpoint is not defined");
  }

  return fetch(`${keypersApiEndpoint}/enabledKeypers`)
    .then((response) => response.json())
    .then((response) => {
      const keypersList = response.data.keypers;

      if (!Array.isArray(keypersList)) {
        throw new Error("Invalid response from Keyper API");
      }

      keypersList.forEach((keyper: `0x${string}`) => {
        if (!isAddress(keyper)) {
          throw new Error("Invalid address in Keyper API response");
        }
      });

      return keypersList;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

/**
 * @param address: `0x${string}`. Address of the user.
 * @returns: Promise<FormattedStake[]>. The stakes of the user.
 */
export const getKeyperStakes = async (
  address: `0x${string}`
): Promise<FormattedStake[]> => {
  const contract = await getStakingContract(address);
  const stakeIds = await contract.read.getUserStakeIds([address]);

  if (!Array.isArray(stakeIds)) {
    throw new Error("Invalid response from Delegate contract: getUserStakeIds");
  }

  if (stakeIds.length === 0) {
    return [];
  }

  const parsedStakes = parseStakes(stakeIds, contract, true, address);

  return parsedStakes;
};

/**
 * @returns Promise<KeyperData[]>. The keypers alongside with their data.
 */
export const getKeypersData = async (): Promise<KeyperData[]> => {
  const keypers = await getKeypers();

  const keypersData = Promise.all(
    keypers.map(async (keyper: `0x${string}`) => {
      const stakes = await getKeyperStakes(keyper);
      const stakesSummedAmount = stakes.reduce(
        (acc, stake) => acc + stake.amount,
        0
      );

      return {
        stakes,
        address: keyper,
        stakesSummedAmount,
      };
    })
  );

  return await keypersData;
};
