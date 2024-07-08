export enum IconPosition {
  LEFT = "left",
  RIGHT = "right",
}

interface IconicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  iconPosition?: IconPosition;
}

export const IconicButton = ({
  icon,
  label,
  onClick,
  iconPosition = IconPosition.LEFT,
  ...props
}: IconicButtonProps) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className="flex space-x-3 items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-white bg-secondary border border-primary rounded-md hover:bg-primary transition"
    >
      {iconPosition === IconPosition.LEFT && icon}
      {label}
      {iconPosition === IconPosition.RIGHT && icon}
    </button>
  );
};
