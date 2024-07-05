import cc from "classcat";

interface SymbolProps {
  size?: ShutterCurrencySymbolSize;
  style?: ShutterCurrencySymbolStyle;
}

export enum ShutterCurrencySymbolStyle {
  HighlightedPrimary = "text-primary font-dm",
  RegularPrimary = "text-secondary font-bold",
  RegularSecondary = "text-secondary font-dm",
}

export enum ShutterCurrencySymbolSize {
  Big = "text-4xl font-medium",
  Small = "text-base font-normal",
}

export const ShutterCurrencySymbol = ({
  size = ShutterCurrencySymbolSize.Small,
  style = ShutterCurrencySymbolStyle.RegularPrimary,
}: SymbolProps) => {
  return (
    <p className={cc(["text-sm text-white font-bold font-dm", size, style])}>
      $SHU
    </p>
  );
};
