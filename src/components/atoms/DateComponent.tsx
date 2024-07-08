import { format } from "date-fns";

interface DateComponentProps {
  timestamp?: number;
}

export const DateComponent = ({
  timestamp = Date.now(),
}: DateComponentProps) => {
  const result = format(timestamp, "dd/MM/yyyy");
  return <p className="text-base font-normal font-dm text-gray">{result}</p>;
};
