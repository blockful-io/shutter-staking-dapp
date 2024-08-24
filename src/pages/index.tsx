/* eslint-disable @next/next/no-img-element */
import { Inter } from "next/font/google";
import cc from "classcat";

import { useEffect, useState } from "react";
import { RewardsAvailable, WalletBalance } from "@/components";
import {
  StakeSection,
  KeypersList,
  StakeModal,
  UnstakeModal,
  ClaimModal,
} from "@/components/organisms";
import { FormattedStake } from "@/types/formattedStake";
import { useUser } from "@/lib/client/useUser";
import { getUserStakes } from "@/lib/service/stake";

const inter = Inter({ subsets: ["latin"] });

enum ModalVersion {
  Claim = "claim",
  Stake = "stake",
  Unstake = "unstake",
}

const Home = () => {
  const [modalVersion, setModalVersion] = useState<ModalVersion | null>(null);
  const { address, isAKeyper } = useUser();

  const [stakeToUnstake, setStakeToUnstake] = useState<FormattedStake | null>(
    null
  );

  useEffect(() => {
    if (address && typeof isAKeyper !== "undefined") {
      getUserStakes(address, isAKeyper);
    }
  }, [address, isAKeyper]);

  const openModal = (modalVersion: ModalVersion) =>
    setModalVersion(modalVersion);
  const closeModal = () => setModalVersion(null);

  return (
    <main
      className={cc([
        "max-w-[1216px] mx-auto h-full flex items-center justify-center pt-10",
        inter.className,
      ])}
    >
      {address ? (
        <>
          <div className="w-full grow grid grid-cols-5 gap-4 h-full">
            <div className="col-span-3">
              <StakeSection
                onUnstake={(stake: FormattedStake) => {
                  setStakeToUnstake(stake);
                  openModal(ModalVersion.Unstake);
                }}
                onStake={() => openModal(ModalVersion.Stake)}
              />
            </div>
            <div className="flex h-full flex-col w-full gap-4 col-span-2">
              <div className="grid grid-cols-2 w-full gap-4">
                <WalletBalance />
                <RewardsAvailable
                  onClaim={() => openModal(ModalVersion.Claim)}
                />
              </div>

              <KeypersList />
            </div>
          </div>

          {modalVersion === ModalVersion.Stake ? (
            <StakeModal isOpen={modalVersion !== null} onClose={closeModal} />
          ) : modalVersion === ModalVersion.Unstake && stakeToUnstake ? (
            <UnstakeModal
              stake={stakeToUnstake}
              isOpen={modalVersion !== null}
              onClose={closeModal}
            />
          ) : modalVersion === ModalVersion.Claim ? (
            <ClaimModal isOpen={modalVersion !== null} onClose={closeModal} />
          ) : null}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-10 mt-40">
          <img
            src="/shutter-icon.svg"
            className="block w-full"
            alt="Shutter Staking"
          />
          <h1 className="border-b border-brandColor">
            In order to access Shutter Staking dApp features, connect your
            wallet in the top-right corner of this page.
          </h1>
        </div>
      )}
    </main>
  );
};

export default Home;
