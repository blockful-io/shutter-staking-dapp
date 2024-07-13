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
  PlusIcon,
  NumberDisplaySize,
  ShutterCurrencySymbolStyle,
} from "@/components";
import { useState } from "react";
import Image from "next/image";
import Avatar from "boring-avatars";

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
          <div className="grid grid-cols-2 w-full gap-4">
            <CardTemplate className="flex flex-col">
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
            <CardTemplate className="flex flex-col">
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
          </div>
          <CardTemplate className="h-full grow col-span-2 flex flex-col">
            <div className="flex justify-between items-center py-3 px-5 border-b border-primary">
              <p>Keypers List</p>

              <div>
                <IconicButton
                  icon={<PlusIcon />}
                  className=" py-2 px-3"
                  label="Delegate"
                  onClick={() => {}}
                />
              </div>
            </div>
            <div className="h-full grow">
              <div className="grid grid-cols-2 px-6 py-4 gap-8">
                <p className="text-gray font-dm text-xs">ADDRESS</p>
                <p className="text-gray font-dm text-xs">STAKED AMOUNT</p>

                <div className="flex gap-2 items-center justify-start font-dm">
                  <Avatar size={25} name="Margaret Brent" variant="beam" />
                  Julian.eth
                </div>
                <div className="flex gap-2 items-center justify-start">
                  <NumberValue
                    displaySize={NumberDisplaySize.Small}
                    numberDisplayStyle={NumberDisplayStyle.PrimaryNumber}
                    label={50000}
                  />
                  <ShutterCurrencySymbol
                    style={ShutterCurrencySymbolStyle.RegularPrimary}
                  />
                </div>

                <div className="flex gap-2 items-center justify-start font-dm">
                  <Avatar size={25} name="Alice Paul" variant="beam" />
                  Dudu.eth
                </div>
                <div className="flex gap-2 items-center justify-start">
                  <NumberValue
                    displaySize={NumberDisplaySize.Small}
                    numberDisplayStyle={NumberDisplayStyle.PrimaryNumber}
                    label={312830}
                  />
                  <ShutterCurrencySymbol
                    style={ShutterCurrencySymbolStyle.RegularPrimary}
                  />
                </div>
              </div>
            </div>

            <IconicButton
              icon={<ArrowRight />}
              iconPosition={IconPosition.RIGHT}
              className="rounded-t-none"
              label="see more"
              onClick={() => {}}
            />
          </CardTemplate>
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
