import { ConnectButton } from "@rainbow-me/rainbowkit";
import UserDropdown from "../molecules/UserDropdown";
import cc from "classcat";
import { useUser } from "@/lib/client/useUser";

interface ConnectWalletProps {
  customClassNames?: string;
}

export const ConnectWallet = ({
  customClassNames = "",
}: ConnectWalletProps) => {
  const { address } = useUser();
  return (
    <ConnectButton.Custom>
      {({ chain, openChainModal, openConnectModal }) => {
        if (!address) {
          return (
            <button
              className={cc([
                "text-xs text-white font-semibold bg-brandColor p-2 px-3 rounded-full",
                customClassNames,
              ])}
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

        if (chain?.unsupported) {
          return (
            <button
              onClick={(e: any) => {
                openChainModal();
                e.preventDefault();
              }}
              type="button"
              className={unsupportedChainClassName}
            >
              <span className="flex-shrink-0 text-xs text-black font-semibold bg-brandColor p-2 px-3 rounded-full">
                Unsupported network
              </span>
            </button>
          );
        }

        return (
          <div style={{ display: "flex", gap: 12 }}>
            <UserDropdown address={address} />
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
