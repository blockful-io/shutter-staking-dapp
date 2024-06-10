import { ConnectButton } from "@rainbow-me/rainbowkit";
import { UserDropdown } from "./UserDropdown";

export const ConnectWallet = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready && account && chain && authenticationStatus === "authenticated";

        if (!connected) {
          return (
            <button
              onClick={(e: any) => {
                openConnectModal();
                e.preventDefault();
              }}
            >
              Connect Wallet
            </button>
          );
        }

        const unsupportedChainClassName = `inline-flex w-auto flex-shrink-0 appearance-none items-center justify-center space-x-2 rounded-md px-5 py-2.5`;

        if (chain.unsupported) {
          return (
            <button
              onClick={(e: any) => {
                openChainModal();
                e.preventDefault();
              }}
              type="button"
              className={unsupportedChainClassName}
            >
              <span className="flex-shrink-0 text-sm font-medium">
                Unsupported network
              </span>
            </button>
          );
        }

        return <UserDropdown />;
      }}
    </ConnectButton.Custom>
  );
};
