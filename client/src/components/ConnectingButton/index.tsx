import s from "./index.module.scss";

interface ConnectingButtonProps {
  hasCreateRoomButton?: boolean;
  buttonText: string;
  handleClick: () => void;
}

export default function ConnectingButton({
  hasCreateRoomButton = false,
  buttonText,
  handleClick,
}: ConnectingButtonProps) {
  const buttonClass = hasCreateRoomButton
    ? s.createRoomButton
    : s.joinRoomButton;

  return (
    <button className={buttonClass} onClick={handleClick}>
      {buttonText}
    </button>
  );
}
