import {
  ArrowDown,
  CurrencyAmount,
  EnsProfile,
  IconicButton,
  LockStatusBadge,
} from "@/components";
import { DateComponent } from "../atoms/DateComponent";
import { FormattedStake } from "@/types/formattedStake";
import { LockStatus } from "@/types/lockStatus";
import toast from "react-hot-toast";
import cc from "classcat";
interface StakingTableRowProps {
  stake: FormattedStake;
  openUnstakeModal: (stake: FormattedStake) => void;
}

export const StakingTableRow = ({
  stake,
  openUnstakeModal,
}: StakingTableRowProps) => {
  return (
    <>
      <CurrencyAmount className="col-span-2 truncate" amount={stake.amount} />

      <div className="flex col-span-3">
        <EnsProfile address={stake.keyper} />
      </div>

      <div className="flex justify-start col-span-2">
        <LockStatusBadge status={stake.status} />
      </div>

      <p className="text-start col-span-2 text-gray-400">
        <DateComponent timestamp={stake.unlockDate} />
      </p>

      <div className="col-span-2 w-[110px]">
        <IconicButton
          className={cc([
            "text-xs border-none !px-3 !w-auto",
            {
              "cursor-not-allowed": stake.status === LockStatus.LOCKED,
            },
          ])}
          onClick={() => {
            if (stake.status === LockStatus.LOCKED) {
              toast.error("It is not possible to unstake a locked stake");
            } else {
              openUnstakeModal(stake);
            }
          }}
          icon={<ArrowDown />}
          label="UNSTAKE"
        />
      </div>
    </>
  );
};
