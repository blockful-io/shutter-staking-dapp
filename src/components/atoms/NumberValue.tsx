import cc from "classcat";

export enum NumberDisplayStyle {
  PrimaryNumber = "text-primary font-dm",
  SecondaryNumber = "text-secondary font-dm",
}

export enum NumberDisplaySize {
  Big = "text-4xl font-medium",
  Small = "text-base font-normal",
}

interface NumberValueProps {
  label: number;
  numberDisplayStyle?: NumberDisplayStyle;
  displaySize?: NumberDisplaySize;
}

export const NumberValue = ({
  label,
  displaySize = NumberDisplaySize.Big,
  numberDisplayStyle = NumberDisplayStyle.PrimaryNumber,
  ...props
}: NumberValueProps) => {
  return (
    <p {...props} className={cc([numberDisplayStyle, displaySize])}>
      {new Intl.NumberFormat("en-US", {
        style: "decimal",
        currency: "USD",
      }).format(label)}
    </p>
  );
};
