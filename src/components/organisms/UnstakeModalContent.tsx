/* eslint-disable react-hooks/exhaustive-deps */
import {
  CurrencyAmount,
  EnsProfile,
  GenericModal,
  InfoTooltip,
} from "../molecules";
import { useState } from "react";
import { unstakeFromAddress } from "@/lib/service/unstake";
import toast from "react-hot-toast";
import { TransactionErrorType } from "@/lib/wallet/txError";
import { FormattedStake } from "@/types/formattedStake";
import { NumberDisplaySize } from "@/types/numberDisplaySize";
import { DateComponent } from "../atoms/DateComponent";
import { useUser } from "@/lib/client/useUser";

interface StakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  stake: FormattedStake;
}

export const UnstakeModal = ({ isOpen, onClose, stake }: StakeModalProps) => {
  const { address, isAKeyper } = useUser();

  const [hasDoneUnstake, setHasDoneUnstake] = useState<boolean>(false);

  const unstake = (): Promise<`0x${string}` | TransactionErrorType> => {
    if (!address) {
      toast.error("Not possible to unstake without signed-in user");
      throw new Error("Not possible to stake without signed-in user");
    }

    return unstakeFromAddress(address, stake);
  };

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title="Unstake SHU Tokens"
      communicateMainCtaTxSuccess={() => setHasDoneUnstake(true)}
      buttonLabel={hasDoneUnstake ? "Finish unstaking" : undefined}
      onMainCtaClick={
        hasDoneUnstake
          ? () => {
              toast.loading("Refresh the page to see updated data");
              return new Promise(onClose);
            }
          : unstake
      }
    >
      <table className="w-full mt-8">
        <tr className="flex items-center justify-between rounded-md rounded-b-none mb-0.5 bg-primary p-3 h-12">
          <th className="font-dm text-xs text-gray flex space-x-2 items-center">
            <p>STAKE AMOUNT</p>

            {isAKeyper ? (
              <InfoTooltip width={18} height={18}>
                Please note how you will not be able to unstake this if after
                <br />
                unstaking it your staked balance is lower than the minimun
                <br />
                staked balance defined by the DAO for keyper accounts.
              </InfoTooltip>
            ) : null}
          </th>
          <td>
            <CurrencyAmount
              displaySize={NumberDisplaySize.Big}
              className="col-span-2 truncate"
              amount={stake.amount}
            />
          </td>
        </tr>
        <tr className="flex items-center justify-between rounded-md rounded-b-none rounded-t-none mb-0.5 bg-primary p-3 h-12">
          <th className="font-dm text-xs text-gray">UNLOCK DATE</th>
          <td>
            <DateComponent timestamp={stake.unlockDate} />
          </td>
        </tr>
        <tr className="flex items-center justify-between rounded-md rounded-t-none mb-0.5 bg-primary p-3 h-12">
          <th className="font-dm text-xs text-gray">KEYPER</th>
          <td>
            <EnsProfile address={stake.keyper} />
          </td>
        </tr>
      </table>
    </GenericModal>
  );
};
