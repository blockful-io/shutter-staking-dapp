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
  NumberInputSlider,
  NumberValue,
  ShutterCurrencySymbol,
  StakingTable,
  TrophyIcon,
  WalletIcon,
  GenericModal,
} from "@/components";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
                label="STAKE"
                onClick={openModal}
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
                label="UNSTAKE"
                onClick={openModal}
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
            label="see more"
            onClick={openModal}
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
                  label="CLAIM"
                  onClick={openModal}
                />
              </div>
            </CardTemplate>
            <CardTemplate className="h-full grow col-span-2 flex flex-col"></CardTemplate>
          </div>
        </div>
      </div>
      <GenericModal
        title="Stake $SHU Tokens"
        onMainCtaClick={() => {}}
        buttonLabel="stake"
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <NumberInputSlider />
      </GenericModal>
    </main>
  );
}
