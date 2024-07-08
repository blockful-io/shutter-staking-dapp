import Image from "next/image";
import { HeightSeparator, HeaderLink, ConnectWallet } from "@/components/atoms";

export const DappHeader = () => {
  return (
    <div className="w-screen flex items-stretch mx-auto p-4 max-w-[1040px] justify-between">
      <div className="flex items-center gap-4">
        <div className="">
          <Image
            src="/favicon.ico"
            alt="Shutter Staking"
            width={120}
            height={20}
          />
        </div>
        <HeightSeparator />
        <HeaderLink href="" label="DAOs" />
        <HeaderLink href="" label="Docs" />
        <HeaderLink href="" label="Forum" />
      </div>

      <ConnectWallet />
    </div>
  );
};
