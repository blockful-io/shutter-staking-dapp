import { bigIntToNumber, numberToBigInt } from "@namehash/ens-utils";

export const formatNumberToShu = (value: number): bigint => {
  return numberToBigInt(value) * 10n ** 18n;
};

export const formatShuToNumber = (value: bigint): number => {
  return Math.ceil(bigIntToNumber(value) / 10 ** 18);
};
