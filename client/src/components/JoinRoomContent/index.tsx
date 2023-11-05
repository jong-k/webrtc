import { useState } from "react";
import JoinRoomInput from "../JoinRoomInput";

export default function JoinRoomContent() {
  const [roomId, setRoomId] = useState("");
  const [nickname, setNickname] = useState("");

  return (
    <div>
      <JoinRoomInput
        roomId={roomId}
        setRoomId={setRoomId}
        nickname={nickname}
        setNickname={setNickname}
      />
    </div>
  );
}
