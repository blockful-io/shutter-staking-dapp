/* eslint-disable react-hooks/exhaustive-deps */
import { CurrencyAmountStyle } from "@/types/currencyAmountStyle";
import {
  CurrencyAmount,
  GenericModal,
  InfoTooltip,
  MIN_STAKING_VALUE,
  NumberInputSlider,
} from "../molecules";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TransactionErrorType } from "@/lib/wallet/txError";
import cc from "classcat";
import { useUser } from "@/lib/client/useUser";
import { SelectKeyperDropdown } from "./SelectKeyperDropdown";
import {
  approveAmount,
  getStakingLockPeriod,
  getStakingMinStakeAmount,
  stake,
} from "@/lib/service/stake";
import { getShuToStakedShuConversionRate } from "@/lib/service/utils";
import { getExpectedRewards } from "@/lib/service/rewards";

interface StakeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StakeModal = ({ isOpen, onClose }: StakeModalProps) => {
  const { address, isAKeyper, walletBalance } = useUser();

  const [stakingAmount, setStakingAmount] = useState<number>(MIN_STAKING_VALUE);

  const [selectedKeyperAddress, setSelectedKeyperAddress] = useState<
    `0x${string}` | null
  >(null);

  const [hasApprovedAmount, setHasApprovedAmount] = useState<boolean>(false);
  const [hasDoneStake, setHasDoneStake] = useState<boolean>(false);

  /**
   * number: when contract default lock period getter is successful
   * null: when contract default lock period getter is unsuccessful
   * undefined: when initialized
   */
  const [lockPeriodDate, setLockPeriodDate] = useState<
    string | undefined | null
  >(undefined);

  /**
   * number: when conversion rate getter is successful
   * null: when conversion rate getter is unsuccessful
   * undefined: when initialized
   */
  const [shuToStakedShuConversionRate, setShuToStakedShuConversionRate] =
    useState<number | undefined | null>(undefined);

  /**
   * number: when  expected reward getter is successful
   * null: when  expected reward getter is unsuccessful
   * undefined: when initialized
   */
  const [expectedReward, setExpectedReward] = useState<
    number | undefined | null
  >(undefined);

  /**
   * This will represent the min staking amount in Stake Modal
   */
  const [minStakeAmount, setMinStakeAmount] =
    useState<number>(MIN_STAKING_VALUE);

  const updateCurrentStakingStep = () => {
    if (!hasApprovedAmount) {
      setHasApprovedAmount(true);
    } else if (!hasDoneStake) {
      setHasDoneStake(true);
    }
  };

  const approveAmountToStake = (): Promise<
    `0x${string}` | TransactionErrorType
  > => {
    // first step is to approve the amount to be staked

    if (!address) {
      toast.error("Not possible to stake without signed-in user");
      throw new Error("Not possible to stake without signed-in user");
    }

    if (!selectedKeyperAddress) {
      toast.error("Not possible to stake without a keyper");
      throw new Error("Not possible to stake without a keyper");
    }

    if (typeof isAKeyper === "undefined") {
      toast.error(
        "We cannot proceed because we could not yet determine wether you are a keyper or not, yet!"
      );
      throw new Error(
        "We cannot proceed because we could not yet determine wether you are a keyper or not, yet!"
      );
    }

    return approveAmount(isAKeyper, stakingAmount, address);
  };

  const stakeAmount = (): Promise<`0x${string}` | TransactionErrorType> => {
    // second step is to create a stake

    if (!address) {
      toast.error("Not possible to stake without signed-in user");
      throw new Error("Not possible to stake without signed-in user");
    }

    if (!selectedKeyperAddress) {
      toast.error("Not possible to stake without a keyper");
      throw new Error("Not possible to stake without a keyper");
    }

    if (typeof isAKeyper === "undefined") {
      toast.error(
        "We cannot proceed because we could not yet determine wether you are a keyper or not, yet!"
      );
      throw new Error(
        "We cannot proceed because we could not yet determine wether you are a keyper or not, yet!"
      );
    }

    return stake(address, stakingAmount, selectedKeyperAddress, isAKeyper);
  };

  useEffect(() => {
    if (address && isOpen && typeof isAKeyper !== "undefined") {
      getStakingLockPeriod(address)
        .then((lockPeriod: string) => {
          setLockPeriodDate(lockPeriod);
        })
        .catch((error: any) => {
          console.error(error);
          setLockPeriodDate(null);
        });

      getShuToStakedShuConversionRate(address, isAKeyper)
        .then((conversionRate: number) => {
          setShuToStakedShuConversionRate(conversionRate);
        })
        .catch((error: any) => {
          console.error(error);
          setShuToStakedShuConversionRate(null);
        });
    }
  }, [address, isOpen]);

  useEffect(() => {
    setHasApprovedAmount(false);
    setHasDoneStake(false);

    if (stakingAmount && address) {
      getExpectedRewards(address, stakingAmount)
        .then((rewards: number) => {
          setExpectedReward(rewards);
        })
        .catch((error: any) => {
          console.error(error);
          setExpectedReward(null);
        });
    }
  }, [stakingAmount]);

  useEffect(() => {
    if (address && typeof isAKeyper !== "undefined") {
      getStakingMinStakeAmount(address, isAKeyper).then(setMinStakeAmount);
    }
  }, [address, isAKeyper]);

  useEffect(() => {
    if (isAKeyper) {
      setSelectedKeyperAddress(address);
    }
  }, [isAKeyper]);

  return typeof walletBalance !== "number" ? null : (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title={isAKeyper ? "Stake SHU Tokens" : "Delegate SHU Tokens"}
      communicateMainCtaTxSuccess={updateCurrentStakingStep}
      onMainCtaClick={
        hasApprovedAmount
          ? hasDoneStake
            ? () => {
                toast.loading("Refresh the page to see updated data");
                return new Promise(onClose);
              }
            : stakeAmount
          : approveAmountToStake
      }
      customErrorMessages={{
        [TransactionErrorType.NOT_NEEDED]:
          "The SHU amount informed is already approved! Let's jump to the next step ✅",
      }}
      buttonLabel={hasDoneStake ? "Finish staking" : undefined}
    >
      <div>
        <SelectKeyperDropdown
          onKeyperSelected={(keyper) => setSelectedKeyperAddress(keyper)}
          selectedKeyperAddress={selectedKeyperAddress}
        />
        <NumberInputSlider
          maxAmount={walletBalance}
          minAmount={minStakeAmount}
          onAmountChange={(amount) => setStakingAmount(amount)}
        />
        <table className="w-full mt-8">
          <tr className="flex items-center justify-between rounded-md rounded-b-none mb-0.5 bg-primary p-3 h-12">
            <th className="font-dm text-xs text-gray flex items-center space-x-2">
              <p>LOCK PERIOD</p>
              <InfoTooltip width={18} height={18} style={{ cursor: "pointer" }}>
                <p className="text-white font-dm text-md">
                  The staking lock-period
                </p>
              </InfoTooltip>
            </th>
            <td>
              {typeof lockPeriodDate === "string" ? (
                <p>{lockPeriodDate}</p>
              ) : lockPeriodDate !== null ? (
                <div className="h-10 w-20 flex items-center">
                  <div className="h-4 w-full bg-gray opacity-30 rounded-md flex animate-pulse"></div>
                </div>
              ) : (
                <p className="text-quaternary text-sm h-10 w-10 flex items-center">
                  Error
                </p>
              )}
            </td>
          </tr>
          <tr className="flex items-center justify-between mb-0.5 bg-primary p-3 h-12">
            <th className="font-dm text-xs text-gray flex items-center space-x-2">
              <p>CONVERSION RATE (SHU/stkSHU)</p>
              <InfoTooltip width={18} height={18} style={{ cursor: "pointer" }}>
                <p className="text-white font-dm text-md">
                  The conversion rate between 1 SHU token and staked SHU
                </p>
              </InfoTooltip>
            </th>
            <td>
              {typeof shuToStakedShuConversionRate === "number" ? (
                <p>{shuToStakedShuConversionRate}</p>
              ) : shuToStakedShuConversionRate !== null ? (
                <div className="h-10 w-20 flex items-center">
                  <div className="h-4 w-full bg-gray opacity-30 rounded-md flex animate-pulse"></div>
                </div>
              ) : (
                <p className="text-quaternary text-sm h-10 w-10 flex items-center">
                  Error
                </p>
              )}
            </td>
          </tr>
          <tr className="flex items-center justify-between rounded-md rounded-t-none bg-primary p-3 h-12">
            <th className="font-dm text-xs text-gray flex items-center space-x-2">
              <p>EXPECTED REWARD</p>
              <InfoTooltip width={18} height={18} style={{ cursor: "pointer" }}>
                <p className="text-white font-dm text-md">
                  The staking expected rewards
                </p>
              </InfoTooltip>
            </th>
            <td>
              {typeof expectedReward === "number" ? (
                <CurrencyAmount
                  amount={expectedReward}
                  amountStyle={CurrencyAmountStyle.Primary}
                />
              ) : expectedReward !== null ? (
                <div className="h-10 w-20 flex items-center">
                  <div className="h-4 w-full bg-gray opacity-30 rounded-md flex animate-pulse"></div>
                </div>
              ) : (
                <p className="text-quaternary text-sm h-10 w-10 flex items-center">
                  Error
                </p>
              )}
            </td>
          </tr>
        </table>
        <div className="h-full flex justify-between items-center mt-4 rounded-b-none bg-tertiary p-3 rounded-md px-6">
          <p
            className={cc([
              "text-gray text-sm pl-8",
              {
                "italic !text-gray": !hasApprovedAmount,
                "font-bold !text-white": hasApprovedAmount,
              },
            ])}
          >
            1st
          </p>
          <p
            className={cc([
              "text-gray text-sm",
              {
                "italic !text-gray": !hasDoneStake,
                "font-bold !text-white": hasDoneStake,
              },
            ])}
          >
            2nd
          </p>
          <p
            className={cc([
              "text-gray text-sm pr-4",
              {
                "italic !text-gray": !hasApprovedAmount,
                "font-bold !text-white": hasDoneStake,
              },
            ])}
          >
            3rd
          </p>
        </div>
        <div className="h-full flex justify-between items-center rounded-t-none bg-tertiary p-3 rounded-md mt-0.5 px-5">
          <p
            className={cc([
              "text-gray text-xs text-center",
              {
                "italic !text-gray": !hasApprovedAmount,
                "font-bold !text-white": hasApprovedAmount,
              },
            ])}
          >
            Approve staking
            <br /> amount
          </p>
          <p
            className={cc([
              "text-gray text-xs text-center",
              {
                "italic !text-gray": !hasDoneStake,
                "font-bold !text-white": hasDoneStake,
              },
            ])}
          >
            Approve stake <br /> creation
          </p>
          <p
            className={cc([
              "text-gray text-xs",
              {
                "italic !text-gray": !hasDoneStake,
                "font-bold !text-white": hasDoneStake,
              },
            ])}
          >
            SHU is staked
          </p>
        </div>
      </div>
    </GenericModal>
  );
};
