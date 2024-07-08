import {
  NumberDisplayStyle,
  NumberValue,
} from "@/components/01-atoms/NumberValue";
import { Inter } from "next/font/google";
import cc from "classcat";
import {
  ArrowDown,
  ArrowUp,
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
        "max-w-[1216px] mx-auto h-full flex items-center justify-center pt-10",
        inter.className,
      ])}
    >
      <div className="w-full grid grid-cols-2 gap-4">
        <CardTemplate className="w-full">
          <div className="grid grid-cols-2 p-6 w-full h-full gap-4">
            <div className="w-full h-full gap-3 flex flex-col items-start justify-center">
              <p className="text-base font-medium font-dm">Staked Balance</p>
              <div className="flex items-end gap-1">
                <NumberValue label={130000} />
                <ShutterCurrencySymbol />
              </div>
              <IconicButton
                icon={<ArrowUp />}
                label={"STAKE"}
                onClick={() => alert("Execute STAKE action")}
              />
            </div>
            <div className="w-full h-full flex gap-3 flex-col items-start justify-center">
              <p className="text-base font-medium font-dm">Total Unlocked</p>
              <div className="flex items-end gap-1">
                <NumberValue
                  numberDisplayStyle={NumberDisplayStyle.SecondaryNumber}
                  label={52352}
                />
                <ShutterCurrencySymbol />
              </div>
              <IconicButton
                icon={<ArrowDown />}
                label={"UNSTAKE"}
                onClick={() => alert("Execute unstake action")}
              />
            </div>
          </div>
        </CardTemplate>
        <div className="grid grid-cols-2 w-full gap-4">
          <CardTemplate>
            <div className="h-full p-[28px] flex flex-col justify-between">
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
                icon={<ArrowUp />}
                label={"CLAIM"}
                onClick={() => alert("Execute claim action")}
              />
            </div>
          </CardTemplate>
        </div>
      </div>
    </main>
  );
}
