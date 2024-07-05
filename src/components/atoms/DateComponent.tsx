import cc from "classcat";
import { format } from "date-fns";

interface DateComponentProps {
  timestamp?: number;
}

export const DateComponent = ({
  timestamp = Date.now(),
}: DateComponentProps) => {
  const result = format(timestamp, "dd-MM-yyyy");
  return (
    <p className={cc(["text-base font-bold font-dm text-gray-400"])}>
      {result}
    </p>
  );
};
