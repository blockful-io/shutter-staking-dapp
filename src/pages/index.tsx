import { NumberValue } from "@/components/01-atoms/NumberValue";
import { Inter } from "next/font/google";
import cc from "classcat";
import {
  ArrowIcon,
  CardTemplate,
  IconicButton,
  ShutterCurrencySymbol,
  TrophyIcon,
  WalletIcon,
} from "@/components";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={cc([
        "h-full flex space-x-6 items-center justify-center pt-10",
        inter.className,
      ])}
    >
      <CardTemplate>
        <div className="h-full p-[28px] flex flex-col justify-between">
          <WalletIcon />
          <div className="flex flex-col">
            <div className="mt-5 bg-pink-500 text-base font-regular font-dm text-white">
              Wallet Balance
            </div>
            <div className="flex space-x-1 items-end mt-1">
              <NumberValue label={13500} />
              <ShutterCurrencySymbol />
            </div>
          </div>
        </div>
      </CardTemplate>
      <CardTemplate>
        <div className="h-full p-[28px] flex flex-col w-[240px]">
          <TrophyIcon />
          <div className="mt-1 text-base font-regular font-dm text-white">
            Rewards Gained
          </div>
          <div className="flex space-x-1 items-end mt-1 mb-4">
            <NumberValue label={1100} />
            <ShutterCurrencySymbol />
          </div>
          <IconicButton
            icon={<ArrowIcon />}
            label={"CLAIM"}
            onClick={() => alert("Execute claim action")}
          />
        </div>
      </CardTemplate>
    </main>
  );
}
