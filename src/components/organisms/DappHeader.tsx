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
        <HeaderLink
          href="https://app.decentdao.org/home?dao=eth:0x36bD3044ab68f600f6d3e081056F34f2a58432c4"
          label="DAO"
        />
        <HeaderLink
          href="https://github.com/blockful-io/shutter-staking/tree/main/docs"
          label="Docs"
        />
        <HeaderLink
          href="https://shutternetwork.discourse.group/"
          label="Forum"
        />
      </div>

      <ConnectWallet />
    </div>
  );
};
