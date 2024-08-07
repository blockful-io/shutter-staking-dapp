import cc from "classcat";

interface SymbolProps {
  style?: ShutterCurrencySymbolStyle;
}

export enum ShutterCurrencySymbolStyle {
  HighlightedPrimary = "text-primary text-base font-bold",
  RegularPrimary = "text-primary font-normal text-base",
  RegularSecondary = "text-secondary font-normal text-base",
  HighlightedSecondary = "text-secondary font-bold text-base",
}

export const ShutterCurrencySymbol = ({
  style = ShutterCurrencySymbolStyle.RegularPrimary,
}: SymbolProps) => {
  return <p className={cc(["font-dm", style])}>SHU</p>;
};
