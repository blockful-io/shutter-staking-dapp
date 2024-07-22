import { useState } from "react";
import { Address } from "viem";
import { CardTemplate } from "../atoms";
import { EnsProfile } from "./EnsProfile";
import { DisconnectIcon } from "../atoms/icons/DisconnectIcon";
import { UserIcon } from "../atoms/icons/UserIcon";

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
              className="flex gap-2 hover:bg-primary p-3 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors duration-300"
              role="menuitem"
            >
              <DisconnectIcon />
              <h2 className="text-gray">Disconnect</h2>
            </button>

            <button
              className="flex gap-2 hover:bg-primary p-3 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors duration-300"
              role="menuitem"
            >
              <UserIcon />
              <h2 className="text-gray">Profile</h2>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdownn;
