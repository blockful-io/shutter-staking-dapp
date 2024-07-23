import Image from "next/image";
import { HeightSeparator, HeaderLink } from "@/components/atoms";
import Link from "next/link";
import { ConnectWallet } from "./ConnectWallet";

export const DappHeader = () => {
  return (
    <div className="w-screen flex items-center mx-auto p-6 max-w-[1216px] h-[91px] justify-between">
      <div className="flex items-center gap-6">
        <Link href="/">
          <Image
            src="/shutter-icon.svg"
            alt="Shutter Staking"
            width={103}
            height={20}
          />
        </Link>
        <HeightSeparator />
        <HeaderLink href="" label="DAOs" />
        <HeaderLink href="" label="Docs" />
        <HeaderLink href="" label="Forum" />
      </div>

      <ConnectWallet />
    </div>
  );
};
