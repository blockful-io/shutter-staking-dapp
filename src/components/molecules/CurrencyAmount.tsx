import React from "react";
import {
  NumberValue,
  ShutterCurrencySymbol,
  ShutterCurrencySymbolStyle,
} from "@/components/atoms";
import cc from "classcat";
import { NumberDisplaySize } from "@/types/numberDisplaySize";
import { NumberDisplayStyle } from "@/types/numberDisplayStyle";
import { CurrencyAmountStyle } from "@/types/currencyAmountStyle";

interface CurrencyAmountProps extends React.HTMLProps<HTMLDivElement> {
  amountStyle?: CurrencyAmountStyle;
  displaySize?: NumberDisplaySize;
  amount: number;
}

export const CurrencyAmount = ({
  amountStyle = CurrencyAmountStyle.Primary,
  displaySize = NumberDisplaySize.Small,
  amount,
  className,
  ...divProps
}: CurrencyAmountProps) => {
  return (
    <div
      className={cc(["flex gap-1 items-end justify-start", className])}
      {...divProps}
    >
      <NumberValue
        displaySize={displaySize}
        numberDisplayStyle={
          amountStyle === CurrencyAmountStyle.Primary
            ? NumberDisplayStyle.PrimaryNumber
            : NumberDisplayStyle.SecondaryNumber
        }
        label={amount}
      />
      <ShutterCurrencySymbol
        style={
          amountStyle === CurrencyAmountStyle.Primary
            ? ShutterCurrencySymbolStyle.RegularPrimary
            : ShutterCurrencySymbolStyle.RegularSecondary
        }
      />
    </div>
  );
};
