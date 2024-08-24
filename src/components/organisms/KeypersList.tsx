import { CardTemplate, CurrencyAmount, EnsProfile } from "@/components";
import { useKeypersList } from "@/lib/client/useKeypersList";

export const KeypersList = () => {
  const { keypersList } = useKeypersList();

  return (
    <CardTemplate className="h-full w-full grow col-span-2 flex flex-col">
      <div className="flex justify-between items-center py-3 px-5 border-b border-primary">
        <p>Keypers List</p>
      </div>
      <table className="h-full grow w-full">
        <thead>
          <tr className="grid grid-cols-2 px-6 py-4 gap-8">
            <td className="text-gray font-dm text-xs">ADDRESS</td>
            <td className="text-gray font-dm text-xs">STAKED AMOUNT</td>
          </tr>
        </thead>
        <tbody>
          <div className="max-h-[300px] overflow-auto">
            {Array.isArray(keypersList) && keypersList.length ? (
              <>
                {keypersList.map((keyper) => (
                  <tr
                    key={keyper.address}
                    className="w-full grid grid-cols-2 px-6 py-4 gap-8 col-span-2"
                  >
                    <td>
                      <EnsProfile address={keyper.address} />
                    </td>
                    <td>
                      <CurrencyAmount amount={keyper.stakesSummedAmount} />
                    </td>
                  </tr>
                ))}
              </>
            ) : Array.isArray(keypersList) ? (
              <tr>
                <td className="mt-16 col-span-2 text-sm text-quaternary h-full w-full flex justify-center items-center">
                  No keypers to display
                </td>
              </tr>
            ) : keypersList === null ? (
              <tr className="w-full flex justify-center items-center">
                <td className="mt-24 col-span-2 text-sm text-quaternary h-full">
                  We faced an error when getting keypers list.
                </td>
              </tr>
            ) : (
              <div className="w-full px-6 pt-1">
                <div className="flex gap-2 items-center">
                  <div className="animate-pulse rounded-full bg-gray w-[25px] h-[25px]"></div>
                  <div className="animate-pulse bg-gray h-3 w-32 rounded-md"></div>
                </div>
              </div>
            )}
          </div>
        </tbody>
      </table>
    </CardTemplate>
  );
};
