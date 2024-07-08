import { Inter } from "next/font/google";
import cc from "classcat";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CardTemplate,
  IconicButton,
  IconPosition,
  NumberDisplayStyle,
  NumberValue,
  ShutterCurrencySymbol,
  TrophyIcon,
  WalletIcon,
} from "@/components";
import { StakingTable } from "@/components/StakingTable";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={cc([
        "max-w-[1216px] mx-auto h-full flex items-center justify-center pt-10",
        inter.className,
      ])}
    >
      <div className="w-full grow grid grid-cols-2 gap-4 h-full">
        <CardTemplate className="w-full flex flex-col h-full">
          <div className="grid grid-cols-2 p-6 w-full h-full gap-4 flex-grow">
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
          <div className="flex-grow min-h-[500px]">
            <StakingTable />
          </div>
          <IconicButton
            className="rounded-t-none"
            iconPosition={IconPosition.RIGHT}
            icon={<ArrowRight />}
            label={"see more"}
            onClick={() => alert("Execute see more action")}
          />
        </CardTemplate>

        <div className="flex h-full flex-col w-full gap-4">
          <div className="grid grid-cols-2 w-full h-ull gap-4">
            <CardTemplate className="h-full flex flex-col">
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
            <CardTemplate className="h-full flex flex-col">
              <div className="h-full p-[28px] flex flex-col justify-between">
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
            <CardTemplate className="h-full grow col-span-2 flex flex-col"></CardTemplate>
          </div>
        </div>
      </div>
    </main>
  );
}
