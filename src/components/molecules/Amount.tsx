import {
  NumberDisplaySize,
  NumberDisplayStyle,
  NumberValue,
  ShutterCurrencySymbol,
  ShutterCurrencySymbolStyle,
} from "@/components/atoms";

interface AmountProps {
  amount: number;
  style?: AmountStyle;
}

export enum AmountStyle {
  Primary,
  Secondary,
}

export const Amount = ({
  style = AmountStyle.Primary,
  amount,
}: AmountProps) => {
  return (
    <div className="flex gap-2 items-center justify-start">
      <NumberValue
        displaySize={NumberDisplaySize.Small}
        numberDisplayStyle={
          style === AmountStyle.Primary
            ? NumberDisplayStyle.PrimaryNumber
            : NumberDisplayStyle.SecondaryNumber
        }
        label={amount}
      />
      <ShutterCurrencySymbol
        style={
          style === AmountStyle.Primary
            ? ShutterCurrencySymbolStyle.RegularPrimary
            : ShutterCurrencySymbolStyle.RegularSecondary
        }
      />
    </div>
  );
};
