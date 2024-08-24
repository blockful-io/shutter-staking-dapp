import cc from "classcat";
import { IconicButton } from "../atoms";
import { BlockchainCTA } from "./BlockchainCta";
import { TransactionErrorType } from "@/lib/wallet/txError";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  buttonLabel?: string;
  children: JSX.Element;
  communicateMainCtaTxSuccess: () => void;
  onMainCtaClick: () => Promise<`0x${string}` | TransactionErrorType>;

  /*
    For each TransactionErrorType, you can define a custom error message to be displayed.
  */
  customErrorMessages?: Partial<Record<TransactionErrorType, string>>;
}

export const GenericModal = ({
  title,
  isOpen,
  onClose,
  children,
  buttonLabel,
  onMainCtaClick,
  customErrorMessages,
  communicateMainCtaTxSuccess,
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
        className="bg-secondary shadow-2xl border-white border-opacity-10 border rounded-lg w-[480px] overflow-hidden"
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
          {buttonLabel ? (
            <IconicButton label={buttonLabel} onClick={onMainCtaClick} />
          ) : (
            <BlockchainCTA
              transactionRequest={onMainCtaClick}
              onSuccess={communicateMainCtaTxSuccess}
              customErrorMessages={customErrorMessages}
            />
          )}
        </div>
      </div>
    </div>
  );
};
