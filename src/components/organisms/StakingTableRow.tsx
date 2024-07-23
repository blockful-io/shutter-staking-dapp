import {
  LockStatus,
  CurrencyAmount,
  LockStatusBadge,
  CurrencyAmountStyle,
} from "@/components";
import { DateComponent } from "../atoms/DateComponent";

export interface StakingTableRowProps {
  index?: number;
  amount: number;
  rewards: number;
  status: LockStatus;
  unlockDate: number;
}

export const StakingTableRow = ({
  index,
  amount,
  rewards,
  status,
  unlockDate,
}: StakingTableRowProps) => {
  return (
    <>
      <p className="text-start col-span-1 text-gray">#{index}</p>

      <CurrencyAmount className="col-span-2" amount={amount} />

      <CurrencyAmount
        className="col-span-2"
        amount={rewards}
        amountStyle={CurrencyAmountStyle.Secondary}
      />

      <div className="flex justify-start col-span-2 ">
        <LockStatusBadge status={status} />
      </div>

      <p className="text-start col-span-2 text-gray-400">
        <DateComponent timestamp={unlockDate} />
      </p>
    </>
  );
};
