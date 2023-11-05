import s from "./index.module.scss";
import Input from "../common/Input";
import { useHostStore } from "../../store";

interface JoinRoomInputProps {
  roomId: string;
  setRoomId: (roomId: string) => void;
  nickname: string;
  setNickname: (name: string) => void;
}

export default function JoinRoomInput({
  roomId,
  setRoomId,
  nickname,
  setNickname,
}: JoinRoomInputProps) {
  const { isRoomHost } = useHostStore();

  return (
    <div className={s.joinRoomInputContainer}>
      {!isRoomHost && (
        <Input
          placeholder="미팅 아이디를 입력하세요"
          value={roomId}
          changeHandler={(e) => setRoomId(e.target.value)}
        />
      )}
      <Input
        placeholder="닉네임을 입력하세요"
        value={nickname}
        changeHandler={(e) => setNickname(e.target.value)}
      />
    </div>
  );
}
