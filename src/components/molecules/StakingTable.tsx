import { FormattedStake } from "@/types/formattedStake";
import { StakingTableRow } from "../organisms";
import { StakingTableHead } from "./StakingTableHead";

interface StakingTableProps {
  /**
   * FormattedStake[]: when user stakes getter was successful
   * null: when user stakes getter was unsuccessful
   * undefined: when user stakes getter is loading
   */
  stakes?: FormattedStake[] | null;
  openUnstakeModal: (stake: FormattedStake) => void;
}

export const StakingTable = ({
  stakes,
  openUnstakeModal,
}: StakingTableProps) => {
  return (
    <div
      role="table"
      className="grid grid-cols-11 gap-4 grid-flow-row-dense w-full pl-6 border-t border-primary py-5"
    >
      <StakingTableHead>
        <p className="text-start col-span-2 font-bold text-xs text-gray-400">
          UNSTAKE
        </p>
      </StakingTableHead>
      {!stakes ? (
        <div className="w-full flex flex-col">
          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
        </div>
      ) : stakes.length ? (
        <div className="max-h-[440px] overflow-auto grid grid-cols-11 gap-4 grid-flow-row-dense w-full border-t border-primary py-5 col-span-11">
          {stakes.map((stake, index) => {
            return (
              <StakingTableRow
                key={index}
                stake={stake}
                openUnstakeModal={openUnstakeModal}
              />
            );
          })}
        </div>
      ) : (
        <div className="mt-40 text-white border-b border-brandColor text-center text-sm col-span-11 mx-auto">
          You have no stakes so far, sign in and do your first SHU stake to see
          it here.
        </div>
      )}
    </div>
  );
};
