import { metaMaskWallet, rainbowWallet } from "@rainbow-me/rainbowkit/wallets";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { createPublicClient, createWalletClient } from "viem";
import { mainnet, sepolia } from "viem/chains";
import { createConfig, http } from "wagmi";
import { isTestnet } from "./chains";
import { QueryClient } from "@tanstack/react-query";
import { addEnsContracts } from "@ensdomains/ensjs";

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

const alchemyApiTestnetKey = process.env.NEXT_PUBLIC_ALCHEMY_TESTNET_KEY;

const mainnetWithEns = addEnsContracts(mainnet);
const sepoliaWithEns = addEnsContracts(sepolia);

if (isTestnet && alchemyApiTestnetKey == undefined) {
  throw new Error("Missing API key for testnet environment");
}

if (!isTestnet && alchemyApiKey == undefined) {
  throw new Error("Missing API key for mainnet environment");
}

// Define the RPC URL for the blockchain in use
export const rpcHttpUrl = `https://eth-${
  isTestnet ? "sepolia" : "mainnet"
}.g.alchemy.com/v2/${isTestnet ? alchemyApiTestnetKey : alchemyApiKey}`;

// Create a public client for fetching data from the blockchain
export const publicClient = createPublicClient({
  chain: isTestnet ? sepoliaWithEns : mainnetWithEns,
  batch: { multicall: true },
  transport: http(),
});

// Create a wallet client for sending transactions to the blockchain
export const walletClient = createWalletClient({
  chain: isTestnet ? sepolia : mainnet,
  transport: http(rpcHttpUrl),
});

// Create a app config for Wagmi
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
if (!projectId) throw new Error("Missing WalletConnect project ID");
const appName = "Shutter Staking dApp";
const connectors = connectorsForWallets(
  [
    {
      groupName: "Which wallet will you use?",
      wallets: [metaMaskWallet, rainbowWallet],
    },
  ],
  {
    projectId,
    appName,
  }
);

const wagmiConfig = createConfig({
  connectors,
  chains: [isTestnet ? sepolia : mainnet],
  transports: {
    [mainnet.id]: http(rpcHttpUrl),
    [sepolia.id]: http(rpcHttpUrl),
  },
  ssr: false,
});

// Create the query client for React Query
const queryClient = new QueryClient();

export { wagmiConfig, queryClient };
