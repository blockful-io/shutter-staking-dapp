import {
  CardTemplate,
  NumberValue,
  ShutterCurrencySymbol,
  WalletIcon,
} from "@/components";

export const WalletBalance = () => {
  return (
    <CardTemplate className="flex flex-col">
      <div className="h-full p-7 flex flex-col justify-between">
        <WalletIcon />
        <div className="flex flex-col">
          <div className="mt-5 text-base font-regular font-dm text-white">
            Wallet Balance
          </div>
          <div className="flex space-x-1 items-end mt-1">
            <NumberValue label={13500} />
            <ShutterCurrencySymbol />
          </div>
        </div>
      </div>
    </CardTemplate>
  );
};
