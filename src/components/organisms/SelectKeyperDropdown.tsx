import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useState } from "react";
import { ArrowDown, UserIcon } from "../atoms";
import { useKeypersList } from "@/lib/client/useKeypersList";
import { EnsProfile } from "../molecules";

interface SelectKeyperDropdownProps {
  selectedKeyperAddress: `0x${string}` | null;
  onKeyperSelected: (keyperAddress: `0x${string}`) => void;
}

export const SelectKeyperDropdown = ({
  selectedKeyperAddress,
  onKeyperSelected,
}: SelectKeyperDropdownProps) => {
  const { keypersList } = useKeypersList();

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="flex flex-col space-y-3 w-full justify-center mb-4">
      <label className="text-white text-start text-sm">Select keyper</label>
      <div className="flex w-full">
        <Popover className="relative w-full">
          <PopoverButton
            onClick={() => setShowDropdown(true)}
            className="w-full"
          >
            <button className="w-full flex items-center p-3 text-base font-normal justify-between rounded-[4px] border border-white border-opacity-10">
              <div className="flex space-x-3 items-center">
                <UserIcon />
                <p className="text-gray">
                  {selectedKeyperAddress ? (
                    <EnsProfile
                      address={selectedKeyperAddress}
                      displayExtendedAddress={true}
                    />
                  ) : (
                    "Select option..."
                  )}
                </p>
              </div>
              <ArrowDown fill="white" />
            </button>
          </PopoverButton>
          {showDropdown && (
            <PopoverPanel
              transition
              anchor="bottom"
              className="w-[436px] z-50 bg-black03 border border-white border-opacity-10 rounded-lg border-t-none rounded-t-none"
            >
              <div className="p-3">
                {keypersList?.map((keyper) => {
                  return (
                    <button
                      key={keyper.address}
                      className="block rounded-lg py-2 px-3 transition hover:bg-white/5 overflow-x-hidden"
                      onClick={() => onKeyperSelected(keyper.address)}
                    >
                      <EnsProfile
                        displayExtendedAddress={true}
                        address={keyper.address}
                      />
                    </button>
                  );
                })}
              </div>
            </PopoverPanel>
          )}
        </Popover>
      </div>
    </div>
  );
};
