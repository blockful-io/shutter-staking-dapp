import { LockStatus } from "./lockStatus";

export interface FormattedStake {
  id: string;
  amount: number;
  status: LockStatus;
  unlockDate: number;
  keyper: `0x${string}`;
}
