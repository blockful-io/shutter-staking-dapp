import {
  CardTemplate,
  NumberValue,
  ShutterCurrencySymbol,
  WalletIcon,
} from "@/components";
import { useUser } from "@/lib/client/useUser";

export const WalletBalance = () => {
  const { walletBalance } = useUser();

  return (
    <CardTemplate className="flex flex-col">
      <div className="h-full p-7 flex flex-col justify-between">
        <WalletIcon />
        <div className="flex flex-col">
          <div className="mt-5 text-base font-regular font-dm text-white">
            Wallet Balance
          </div>
          <div className="flex space-x-1 items-end mt-1">
            {typeof walletBalance === "number" ? (
              <>
                <NumberValue label={walletBalance} />
                <ShutterCurrencySymbol />
              </>
            ) : walletBalance === null ? (
              <p className="text-quaternary text-sm h-10 w-10 flex items-end">
                Error
              </p>
            ) : (
              <div className="h-10 w-20 flex items-end">
                <div className="h-4 w-full bg-gray opacity-30 rounded-md flex animate-pulse"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </CardTemplate>
  );
};
