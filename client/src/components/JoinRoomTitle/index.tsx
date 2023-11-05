import s from "./index.module.scss";

interface JoinRoomTitleProps {
  isRoomHost: boolean;
}

export default function JoinRoomTitle({ isRoomHost }: JoinRoomTitleProps) {
  const titleText = isRoomHost ? "Host meeting" : "Join meething";

  return <p className={s.joinRoomTitle}>{titleText}</p>;
}
