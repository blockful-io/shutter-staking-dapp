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

const Modal = ({ isOpen, onClose, children, title, action }: ModalProps) => {
  return (
    <div
      className={cc([
        "fixed inset-0 bg-black bg-opacity-50 flex backdrop-blur-sm justify-center items-center z-50 transition-all duration-300",
        isOpen ? "" : "z-[-1] opacity-0",
      ])}
    >
      <div className="bg-[#1E282D] shadow-2xl border-white border-opacity-10 border rounded-lg w-[480px] overflow-hidden">
        <div className="flex justify-between border-white border-opacity-10 items-center p-4 border-b">
          <h3 className="text-lg font-dm font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-white hover:bg-secondary shadow-white px-2 rounded-md bg-primary text-xl transition-colors duration-300"
          >
            &times;
          </button>
        </div>

        <div className="p-4">{children}</div>

        <div className="p-4">
          <IconicButton
            label={title}
            onClick={action}
            className="bg-yellow text-[#1E282D] hover:bg-yellow hover:bg-opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
