import { LockStatus } from "../atoms";
import { StakingTableHead } from "./StakingTableHead";
import {
  StakingTableRow,
  StakingTableRowProps,
} from "../organisms/StakingTableRow";

const defaultRows: StakingTableRowProps[] = [
  {
    amount: 50000,
    rewards: 2354,
    status: LockStatus.LOCKED,
    unlockDate: Date.now(),
  },
  {
    amount: 100000,
    rewards: 20354,
    status: LockStatus.UNLOCKED,
    unlockDate: Date.now(),
  },
  {
    amount: 500000,
    rewards: 23154,
    status: LockStatus.LOCKED,
    unlockDate: Date.now(),
  },
];

interface StakingTableProps {
  rows?: StakingTableRowProps[];
}

export const StakingTable = ({ rows = defaultRows }: StakingTableProps) => {
  return (
    <div
      role="table"
      className="grid grid-cols-9 gap-4 grid-flow-row-dense w-full pl-6 border-t border-primary py-5"
    >
      <StakingTableHead />
      {rows.map((item, index) => {
        return (
          <StakingTableRow
            key={index}
            index={index + 1}
            amount={item.amount}
            rewards={item.rewards}
            status={item.status}
            unlockDate={item.unlockDate}
          />
        );
      })}
    </div>
  );
};
