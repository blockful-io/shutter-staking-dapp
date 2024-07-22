import { useState } from "react";
import { Address } from "viem";
import { CardTemplate } from "../atoms";
import { EnsProfile } from "./EnsProfile";

interface UserDropdownProps {
  address: Address;
}
const UserDropdownn = ({ address }: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <CardTemplate className="p-2">
          <EnsProfile address={address} />
        </CardTemplate>
      </button>

      {isOpen && (
        <div className="z-50 origin-top-right border-primary border absolute right-0 mt-2 w-[220px] rounded-md shadow-lg bg-secondary">
          <div
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              className="block hover:bg-white p-3 text-sm text-gray-700 hover:bg-gray-100 w-full text-left "
              role="menuitem"
            >
              <h2 className="text-gray">Disconnect</h2>
            </button>

            <button
              className="block hover:bg-white p-3 text-sm text-gray-700 hover:bg-gray-100 w-full text-left "
              role="menuitem"
            >
              <h2 className="text-gray">Profile</h2>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdownn;
