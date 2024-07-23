import React from "react";
import {
  NumberDisplaySize,
  NumberDisplayStyle,
  NumberValue,
  ShutterCurrencySymbol,
  ShutterCurrencySymbolStyle,
} from "@/components/atoms";
import cc from "classcat";

interface CurrencyAmountProps extends React.HTMLProps<HTMLDivElement> {
  amountStyle?: CurrencyAmountStyle;
  amount: number;
}

export enum CurrencyAmountStyle {
  Primary,
  Secondary,
}

export const CurrencyAmount = ({
  amountStyle = CurrencyAmountStyle.Primary,
  amount,
  className,
  ...divProps
}: CurrencyAmountProps) => {
  return (
    <div
      className={cc(["flex gap-1 items-center justify-start", className])}
      {...divProps}
    >
      <NumberValue
        displaySize={NumberDisplaySize.Small}
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
