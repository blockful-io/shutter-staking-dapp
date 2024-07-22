import { Inter } from "next/font/google";
import cc from "classcat";

import { useState } from "react";
import {
  GenericModal,
  NumberInputSlider,
  RewardsGained,
  WalletBalance,
} from "@/components";
import { StakeSection, KeypersList } from "@/components/organisms";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
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
        <StakeSection onButtonClick={openModal} />
        <div className="flex h-full flex-col w-full gap-4">
          <div className="grid grid-cols-2 w-full gap-4">
            <WalletBalance />
            <RewardsGained onButtonClick={openModal} />
          </div>

          <KeypersList />
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
};

export default Home;
