import cc from "classcat";

export const Skeleton = ({ className }: { className: string }) => {
  return (
    <div
      className={cc([
        "animate-pulse bg-gray-300 rounded-lg shadow-lg",
        className,
      ])}
    ></div>
  );
};
