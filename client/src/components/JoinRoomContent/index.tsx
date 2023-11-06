import { useState } from "react";
import JoinRoomInput from "../JoinRoomInput";
import OnlyWithAudioCheckbox from "../OnlyWithAudioCheckbox";

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
      <OnlyWithAudioCheckbox />
    </div>
  );
}
