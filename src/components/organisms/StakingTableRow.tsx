import {
  Amount,
  AmountStyle,
  LockStatus,
  LockStatusBadge,
  NumberDisplaySize,
  NumberDisplayStyle,
  NumberValue,
  ShutterCurrencySymbol,
  ShutterCurrencySymbolStyle,
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

      <Amount className="col-span-2" amount={amount} />

      <Amount
        className="col-span-2"
        amount={rewards}
        amountStyle={AmountStyle.Secondary}
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
