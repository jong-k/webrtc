import s from "./index.module.scss";

interface InputProps {
  placeholder?: string;
  value: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  placeholder,
  value,
  changeHandler,
}: InputProps) {
  return (
    <input
      className={s.joinRoomInput}
      placeholder={placeholder}
      value={value}
      onChange={changeHandler}
    />
  );
}
