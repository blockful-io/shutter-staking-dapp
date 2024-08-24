import { useEffect, useState } from "react";
import { normalize } from "viem/ens";
import { publicClient } from "@/lib/wallet/wallet-config";
import { getName } from "@ensdomains/ensjs/public";
import Avatar from "boring-avatars";
import { getEnsAvatar } from "viem/actions";
import cc from "classcat";

interface UserState {
  avatar: string | null;
  name: string | null;
  isLoading: boolean;
}

interface EnsProfileProps {
  address: `0x${string}`;
  displayExtendedAddress?: boolean;
}

export const EnsProfile = ({
  address,
  displayExtendedAddress,
}: EnsProfileProps) => {
  const [user, setUser] = useState<UserState>({
    avatar: null,
    name: null,
    isLoading: true,
  });

  useEffect(() => {
    const getEnsUser = async () => {
      try {
        const getNameResult = await getName(publicClient, {
          address: address,
        });

        const ensAvatar = getNameResult?.name
          ? await getEnsAvatar(publicClient, {
              name: normalize(getNameResult?.name),
            })
          : null;

        setUser({
          avatar: ensAvatar ?? null,
          name: getNameResult?.name ?? null,
          isLoading: false,
        });
      } catch (error) {
        console.error("Error fetching ENS user data:", error);
        setUser((prevState) => ({ ...prevState, isLoading: false }));
      }
    };

    getEnsUser();
  }, [address]);

  if (user.isLoading) {
    return (
      <div className="flex gap-2 items-center">
        <div className="animate-pulse rounded-full bg-gray w-[25px] h-[25px]"></div>
        <div
          className={cc([
            "animate-pulse bg-gray h-3 rounded-md",
            {
              "w-32": !displayExtendedAddress,
              "w-80": displayExtendedAddress,
            },
          ])}
        ></div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-center justify-start font-dm text-base">
      {user.avatar ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          width={25}
          height={25}
          alt="profile"
          src={user.avatar}
          className="rounded-full"
        />
      ) : (
        <Avatar
          size={25}
          variant="beam"
          name="Alice Paul"
          colors={["rgba(0,68,164, 1)", "rgba(212, 237, 122, 0.12)"]}
        />
      )}
      {user.name ? user.name : ellipseAddress(address, displayExtendedAddress)}
    </div>
  );
};

function ellipseAddress(
  address: string,
  displayExtendedAddress = false
): string {
  if (!address) {
    return "";
  }
  return displayExtendedAddress
    ? `${address.slice(0, 14)}...${address.slice(-20)}`
    : `${address.slice(0, 6)}...${address.slice(-4)}`;
}
