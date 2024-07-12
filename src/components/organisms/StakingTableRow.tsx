import {
  LockStatus,
  LockStatusBadge,
  NumberDisplaySize,
  NumberDisplayStyle,
  NumberValue,
  ShutterCurrencySymbol,
  ShutterCurrencySymbolStyle,
} from "@/components";

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
      <p className="text-start col-span-1 text-gray-400">#{index}</p>
      <div className="flex gap-1 justify-start col-span-2 ">
        <NumberValue displaySize={NumberDisplaySize.Small} label={amount} />
        <ShutterCurrencySymbol />
      </div>

      <div className="flex gap-1 justify-start col-span-2 text-secondary">
        <NumberValue
          displaySize={NumberDisplaySize.Small}
          numberDisplayStyle={NumberDisplayStyle.SecondaryNumber}
          label={rewards}
        />{" "}
        <ShutterCurrencySymbol
          style={ShutterCurrencySymbolStyle.RegularSecondary}
        />
      </div>

      <div className="flex justify-start col-span-2 ">
        <LockStatusBadge status={status} />
      </div>

      <p className="text-start col-span-2 text-gray-400">06/10/2024</p>
    </>
  );
};
