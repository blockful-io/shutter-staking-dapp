import { createWalletClient, custom, getContract, http, isAddress } from "viem";
import { mainnet, sepolia } from "viem/chains";
import { isTestnet } from "../wallet/chains";
import {
  delegateContractAbi,
  rewardsDistributorContractAbi,
  stakingContractAbi,
  tokenContractAbi,
} from "./abis";
import { rpcHttpUrl } from "../wallet/wallet-config";

// Contract addresses definition
const STAKING_CONTRACT_ADDRESS_NOT_TYPED = isTestnet
  ? process.env.NEXT_PUBLIC_SEPOLIA_STAKING_PROXY
  : process.env.NEXT_PUBLIC_MAINNET_STAKING_PROXY;

if (
  !STAKING_CONTRACT_ADDRESS_NOT_TYPED ||
  !isAddress(STAKING_CONTRACT_ADDRESS_NOT_TYPED)
) {
  throw new Error("Staking contract address is not defined");
}

export const STAKING_CONTRACT_ADDRESS =
  STAKING_CONTRACT_ADDRESS_NOT_TYPED as `0x${string}`;

const DELEGATE_CONTRACT_ADDRESS_NOT_TYPED = isTestnet
  ? process.env.NEXT_PUBLIC_SEPOLIA_DELEGATE_CONTRACT
  : process.env.NEXT_PUBLIC_MAINNET_DELEGATE_CONTRACT;

if (
  !DELEGATE_CONTRACT_ADDRESS_NOT_TYPED ||
  !isAddress(DELEGATE_CONTRACT_ADDRESS_NOT_TYPED)
) {
  throw new Error("Delegate contract address is not defined");
}

export const DELEGATE_CONTRACT_ADDRESS =
  DELEGATE_CONTRACT_ADDRESS_NOT_TYPED as `0x${string}`;

const SHU_TOKEN_ADDRESS_NOT_TYPED = isTestnet
  ? process.env.NEXT_PUBLIC_SEPOLIA_SHU_TOKEN
  : process.env.NEXT_PUBLIC_MAINNET_SHU_TOKEN;

if (!SHU_TOKEN_ADDRESS_NOT_TYPED || !isAddress(SHU_TOKEN_ADDRESS_NOT_TYPED)) {
  throw new Error("SHU token address is not defined");
}

export const SHU_TOKEN_ADDRESS = SHU_TOKEN_ADDRESS_NOT_TYPED as `0x${string}`;

const REWARDS_CONTRACT_ADDRESS_NOT_TYPED = isTestnet
  ? process.env.NEXT_PUBLIC_SEPOLIA_REWARDS_CONTRACT
  : process.env.NEXT_PUBLIC_MAINNET_REWARDS_CONTRACT;

if (
  !REWARDS_CONTRACT_ADDRESS_NOT_TYPED ||
  !isAddress(REWARDS_CONTRACT_ADDRESS_NOT_TYPED)
) {
  throw new Error("SHU token address is not defined");
}

export const REWARDS_CONTRACT_ADDRESS =
  REWARDS_CONTRACT_ADDRESS_NOT_TYPED as `0x${string}`;

// Create contract instances
export const getStakingContract = async (
  address: `0x${string}`,
  withCustomTransport?: boolean
) => {
  const client = createWalletClient({
    chain: isTestnet ? sepolia : mainnet,
    transport: withCustomTransport ? custom(window.ethereum) : http(rpcHttpUrl),
    account: address,
  });

  return getContract({
    address: STAKING_CONTRACT_ADDRESS as `0x${string}`,
    abi: stakingContractAbi,
    client: client,
  });
};

export const getDelegateContract = async (
  address: `0x${string}`,
  withCustomTransport?: boolean
) => {
  const client = createWalletClient({
    chain: isTestnet ? sepolia : mainnet,
    transport: withCustomTransport ? custom(window.ethereum) : http(rpcHttpUrl),
    account: address,
  });

  return getContract({
    address: DELEGATE_CONTRACT_ADDRESS as `0x${string}`,
    abi: delegateContractAbi,
    client: client,
  });
};

export const getRewardsContract = async (address: `0x${string}`) => {
  const client = createWalletClient({
    chain: isTestnet ? sepolia : mainnet,
    transport: custom(window.ethereum),
    account: address,
  });

  return getContract({
    address: REWARDS_CONTRACT_ADDRESS as `0x${string}`,
    abi: rewardsDistributorContractAbi,
    client: client,
  });
};

export const getTokenContract = async (
  address: `0x${string}`,
  withCustomTransport?: boolean
) => {
  const client = createWalletClient({
    chain: isTestnet ? sepolia : mainnet,
    transport: withCustomTransport ? custom(window.ethereum) : http(rpcHttpUrl),
    account: address,
  });

  return getContract({
    address: SHU_TOKEN_ADDRESS as `0x${string}`,
    abi: tokenContractAbi,
    client: client,
  });
};
