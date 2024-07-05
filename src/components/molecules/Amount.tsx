import cc from "classcat";
import { NumberValue, ShutterCurrencySymbol } from "../atoms";

export enum NumberDisplayStyle {
  PrimaryNumber = "text-primary font-dm",
  SecondaryNumber = "text-secondary font-dm",
}

export enum NumberDisplaySize {
  Big = "text-4xl font-medium",
  Small = "text-base font-normal",
}

interface AmountProps {}

export const Amount = ({ ...props }: AmountProps) => {
  return (
    <div className="flex items-end bg-blue-500 p-4">
      <NumberValue label={50000} />
      <ShutterCurrencySymbol />
    </div>
  );
};
