import React from "react";
import cc from "classcat";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={cc([
        "fixed inset-0 bg-black bg-opacity-50 flex backdrop-blur-sm justify-center items-center z-50 transition-all duration-300",
        isOpen ? "" : "z-[-1] opacity-0",
      ])}
    >
      <div className="bg-black shadow-pink-600 shadow-2xl border-primary border rounded-lg w-1/3 overflow-hidden">
        <div className="flex justify-between border-primary items-center p-4 border-b">
          <h3 className="text-lg font-dm font-semibold">Modal Title</h3>
          <button
            onClick={onClose}
            className="text-white hover:bg-secondary shadow-white px-2 rounded-md bg-black text-xl transition-colors duration-300"
          >
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;