import { Inter } from "next/font/google";
import cc from "classcat";
import {
  CardTemplate,
  ShutterCurrencySymbol,
  WalletIcon,
  NumberValue,
} from "@/components";
import Slider from "@/components/molecules/Slider";
import Modal from "@/components/molecules/Modal";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

      <div className="flex h-full border border-primary rounded-md p-4 max-w-lg flex-col w-full gap-4">
        <button
          className="border-primary hover:bg-secondary transition-colors duration-200 rounded-sm border p-4"
          onClick={openModal}
        >
          Open modal
        </button>
        <Slider />
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Slider />
      </Modal>
    </main>
  );
}
