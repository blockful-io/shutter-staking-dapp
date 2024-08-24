import cc from "classcat";

interface SymbolProps {
  style?: ShutterCurrencySymbolStyle;
}

export enum ShutterCurrencySymbolStyle {
  HighlightedPrimary = "text-primary text-base font-bold",
  RegularPrimary = "text-primary font-normal text-base",
  RegularSecondary = "text-brandColor font-normal text-base",
  HighlightedSecondary = "text-brandColor font-bold text-base",
}

export const ShutterCurrencySymbol = ({
  style = ShutterCurrencySymbolStyle.RegularPrimary,
}: SymbolProps) => {
  return <p className={cc(["font-dm", style])}>SHU</p>;
};
