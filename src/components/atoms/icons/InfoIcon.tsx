import { SVGProps } from "react";

export const InfoIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      x="0"
      y="0"
      {...props}
      viewBox="0 0 30 30"
      fill={props.fill || "gray"}
      width={props.width || "30px"}
      height={props.height || "30px"}
      xmlns="http://www.w3.org/2000/svg"
      className="hover:opacity-70 transition"
    >
      <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16,21h-2v-7h2V21z M15,11.5 c-0.828,0-1.5-0.672-1.5-1.5s0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5S15.828,11.5,15,11.5z"></path>
    </svg>
  );
};
