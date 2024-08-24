import { NumberDisplaySize } from "@/types/numberDisplaySize";
import { NumberDisplayStyle } from "@/types/numberDisplayStyle";
import cc from "classcat";

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
    <p {...props} className={cc([numberDisplayStyle, displaySize, "truncate"])}>
      {new Intl.NumberFormat("en-US", {
        style: "decimal",
        currency: "USD",
      }).format(label)}
    </p>
  );
};
