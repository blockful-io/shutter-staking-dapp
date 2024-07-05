import cc from "classcat";
import { NumberValue, ShutterCurrencySymbol } from "../atoms";

enum AmountDisplaySize {
  big = "big",
  small = "small",
}

interface AmountProps {}

export const Amount = ({ ...props }: AmountProps) => {
  return (
    <div className="flex items-end rounded-md">
      <NumberValue label={50000} />
      <ShutterCurrencySymbol />
    </div>
  );
};
