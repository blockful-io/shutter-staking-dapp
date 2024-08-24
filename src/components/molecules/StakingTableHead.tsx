export const StakingTableHead = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <>
      <p className="text-start col-span-2 font-bold text-xs text-gray-400">
        AMOUNT
      </p>
      <p className="text-start col-span-3 font-bold text-xs text-gray-400">
        KEYPER
      </p>
      <p className="text-start col-span-2 font-bold text-xs text-gray-400">
        STATUS
      </p>
      <p className="text-start col-span-2 font-bold text-xs text-gray-400">
        UNLOCK DATE
      </p>
      {children}
    </>
  );
};
