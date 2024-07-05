import { ConnectButton, useAccountModal } from "@rainbow-me/rainbowkit";

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
              className="text-white"
              onClick={(e: any) => {
                openConnectModal();
                e.preventDefault();
              }}
            >
              Connect Wallet
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
              <span className="flex-shrink-0 text-sm font-medium">
                Unsupported network
              </span>
            </button>
          );
        }

        // TODO: create Shutter Stakind dApp UserDropdown
        // return <UserDropdown />;

        return (
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={openChainModal}
              style={{ display: "flex", alignItems: "center" }}
              type="button"
            >
              {chain.hasIcon && (
                <div
                  style={{
                    background: chain.iconBackground,
                    width: 12,
                    height: 12,
                    borderRadius: 999,
                    overflow: "hidden",
                    marginRight: 4,
                  }}
                >
                  {chain.iconUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      alt={chain.name ?? "Chain icon"}
                      src={chain.iconUrl}
                      style={{ width: 12, height: 12 }}
                    />
                  )}
                </div>
              )}
              {chain.name}
            </button>

            <button onClick={openAccountModal} type="button">
              {account.displayName}
              {account.displayBalance ? ` (${account.displayBalance})` : ""}
            </button>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
