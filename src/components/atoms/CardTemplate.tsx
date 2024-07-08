import React from "react";
import cc from "classcat";

interface CardTemplateProps extends React.ComponentPropsWithoutRef<"div"> {}

export const CardTemplate: React.FC<CardTemplateProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={cc(["border border-primary rounded-lg", className])}
      {...rest}
    >
      {children}
    </div>
  );
};
