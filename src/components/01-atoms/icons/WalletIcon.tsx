const DEFAULT_COLOR = "#D4ED7A";

export const WalletIcon = ({ fill = DEFAULT_COLOR }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
    >
      <path
        d="M6.16667 4.66666C4.69583 4.66666 3.5 5.86249 3.5 7.33332V20.6667C3.5 22.1375 4.69583 23.3333 6.16667 23.3333H22.1667C23.6375 23.3333 24.8333 22.1375 24.8333 20.6667V11.3333C24.8333 9.86249 23.6375 8.66666 22.1667 8.66666H6.83333C6.46667 8.66666 6.16667 8.36666 6.16667 7.99999C6.16667 7.63332 6.46667 7.33332 6.83333 7.33332H22.1667C22.9042 7.33332 23.5 6.73749 23.5 5.99999C23.5 5.26249 22.9042 4.66666 22.1667 4.66666H6.16667ZM20.8333 14.6667C21.187 14.6667 21.5261 14.8071 21.7761 15.0572C22.0262 15.3072 22.1667 15.6464 22.1667 16C22.1667 16.3536 22.0262 16.6928 21.7761 16.9428C21.5261 17.1928 21.187 17.3333 20.8333 17.3333C20.4797 17.3333 20.1406 17.1928 19.8905 16.9428C19.6405 16.6928 19.5 16.3536 19.5 16C19.5 15.6464 19.6405 15.3072 19.8905 15.0572C20.1406 14.8071 20.4797 14.6667 20.8333 14.6667Z"
        fill={fill}
      />
    </svg>
  );
};
