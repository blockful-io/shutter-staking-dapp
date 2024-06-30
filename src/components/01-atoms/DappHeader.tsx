import Image from "next/image";
import { ConnectWallet } from "./ConnectWallet";

export const DappHeader = () => {
  return (
    <div className="w-screen flex items-center mx-auto p-4 max-w-[1040px] justify-between">
      <Image src="/favicon.ico" alt="Shutter Staking" width={120} height={20} />
      <ConnectWallet />
    </div>
  );
};
