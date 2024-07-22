import React from "react";
import {
  NumberDisplaySize,
  NumberDisplayStyle,
  NumberValue,
  ShutterCurrencySymbol,
  ShutterCurrencySymbolStyle,
} from "@/components/atoms";
import cc from "classcat";

interface AmountProps extends React.HTMLProps<HTMLDivElement> {
  amount: number;
  amountStyle?: AmountStyle;
}

export enum AmountStyle {
  Primary,
  Secondary,
}

export const Amount = ({
  amountStyle = AmountStyle.Primary,
  amount,
  className,
  ...divProps
}: AmountProps) => {
  return (
    <div
      className={cc(["flex gap-1 items-center justify-start", className])}
      {...divProps}
    >
      <NumberValue
        displaySize={NumberDisplaySize.Small}
        numberDisplayStyle={
          amountStyle === AmountStyle.Primary
            ? NumberDisplayStyle.PrimaryNumber
            : NumberDisplayStyle.SecondaryNumber
        }
        label={amount}
      />
      <ShutterCurrencySymbol
        style={
          amountStyle === AmountStyle.Primary
            ? ShutterCurrencySymbolStyle.RegularPrimary
            : ShutterCurrencySymbolStyle.RegularSecondary
        }
      />
    </div>
  );
};
