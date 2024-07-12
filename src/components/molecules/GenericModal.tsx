import cc from "classcat";
import { IconicButton } from "../atoms";

interface ModalProps {
  title: string;
  onMainCtaClick: () => void;
  buttonLabel: string;
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
}

export const GenericModal = ({
  isOpen,
  onClose,
  children,
  title,
  onMainCtaClick,
  buttonLabel,
}: ModalProps) => {
  return (
    <div
      className={cc([
        "fixed inset-0 bg-black bg-opacity-50 flex backdrop-blur-sm justify-center items-center transition-all duration-300",
        isOpen ? "z-50 opacity-100" : "opacity-0 z-[-50]",
      ])}
      onClick={onClose}
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="bg-[#1E282D] shadow-2xl border-white border-opacity-10 border rounded-lg w-[480px] overflow-hidden"
      >
        <div className="flex justify-between border-white border-opacity-10 items-center p-5 border-b">
          <h3 className="text-lg text-[20px] font-dm font-medium">{title}</h3>
          <button
            onClick={onClose}
            className="text-white bg-secondary shadow-white px-2 rounded-md hover:bg-primary text-xl transition-colors duration-300"
          >
            &times;
          </button>
        </div>

        <div className="p-5">{children}</div>

        <div className="p-5">
          <IconicButton
            label={buttonLabel}
            onClick={onMainCtaClick}
            className="bg-yellow !text-[#1E282D] hover:bg-yellow hover:brightness-110 !rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
