import { SVGProps } from "react";
import { InfoIcon, Tooltip } from "../atoms";

export const InfoTooltip = (props: SVGProps<SVGSVGElement>) => {
  return <Tooltip trigger={<InfoIcon {...props} />}>{props.children}</Tooltip>;
};
