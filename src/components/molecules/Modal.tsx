import React from "react";
import cc from "classcat";
import { IconicButton } from "../atoms";

interface ModalProps {
  title: string;
  action: () => void;
  buttonTitle: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  action,
  buttonTitle,
}: ModalProps) => {
  return (
    <div
      className={cc([
        "fixed inset-0 bg-black bg-opacity-50 flex backdrop-blur-sm justify-center items-center transition-all duration-300",
        isOpen ? "z-50 opacity-100" : "opacity-0 z-[-50]",
      ])}
    >
      <div className="bg-[#1E282D] shadow-2xl border-white border-opacity-10 border rounded-lg w-[480px] overflow-hidden">
        <div className="flex justify-between border-white border-opacity-10 items-center p-5 border-b">
          <h3 className="text-lg text-[20px] font-dm font-medium	">{title}</h3>
          <button
            onClick={onClose}
            className="text-white bg-secondary shadow-white px-2 rounded-md hover:bg-primary text-xl transition-colors duration-300"
          >
            &times;
          </button>
        </div>

        <div className="p-5">{children}</div>

        <div className="p-5 font-dm">
          <div className="flex flex-col rounded-md overflow-hidden gap-[1px]">
            <div className="flex items-center justify-between bg-primary p-3">
              <p className="text-gray text-base">rewards available</p>
              <p>120,000 $SHU</p>
            </div>
            <div className="flex flex-center justify-between bg-primary p-4">
              <p className="text-gray">lock period</p>
              <p>6 months</p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <IconicButton
            label={buttonTitle}
            onClick={action}
            className="bg-yellow !text-[#1E282D] hover:bg-yellow hover:bg-opacity-80 !rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
