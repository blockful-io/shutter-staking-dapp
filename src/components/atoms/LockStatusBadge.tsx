import { LockStatus } from "@/types/lockStatus";

interface LockStatusBadgeProps {
  status: LockStatus;
}

export const LockStatusBadge = ({ status }: LockStatusBadgeProps) => {
  return (
    <div
      className={`px-2 py-1 text-xs font-bold rounded-full font-dm ${
        status === LockStatus.LOCKED
          ? "bg-quaternary text-quaternary"
          : "bg-tertiary text-tertiary"
      }`}
    >
      {status}
    </div>
  );
};
