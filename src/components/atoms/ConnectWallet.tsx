import { ConnectButton, useAccountModal } from "@rainbow-me/rainbowkit";
import UserDropdownn from "../molecules/UserDropdown";

export const ConnectWallet = () => {
  const { openAccountModal } = useAccountModal();

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
              className="text-xs text-black font-semibold bg-green p-2 px-3 rounded-full"
              onClick={(e: any) => {
                openConnectModal();
                e.preventDefault();
              }}
            >
              CONNECT
            </button>
          );
        }

        const unsupportedChainClassName = `text-white inline-flex w-auto flex-shrink-0 appearance-none items-center justify-center space-x-2 rounded-md px-5 py-2.5`;

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
              <span className="flex-shrink-0 text-xs text-black font-semibold bg-green p-2 px-3 rounded-full">
                Unsupported network
              </span>
            </button>
          );
        }

        // TODO: create Shutter Stakind dApp UserDropdown
        // return <UserDropdown />;

        return (
          <div style={{ display: "flex", gap: 12 }}>
            {account.address && (
              <UserDropdownn address={account.address as `0x${string}`} />
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
