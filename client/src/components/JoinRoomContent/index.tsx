import { useState } from "react";
import JoinRoomInput from "../JoinRoomInput";
import OnlyWithAudioCheckbox from "../OnlyWithAudioCheckbox";
import { useConnectStore } from "../../store";
import ErrorMessage from "../common/ErrorMessage";

interface JoinRoomContentProps {
  isRoomHost: boolean;
}

export default function JoinRoomContent({ isRoomHost }: JoinRoomContentProps) {
  const [roomId, setRoomId] = useState("");
  const [nickname, setNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { isConnectOnlyWithAudio, setIsConnectOnlyWithAudio } =
    useConnectStore();

  return (
    <div>
      <JoinRoomInput
        roomId={roomId}
        setRoomId={setRoomId}
        nickname={nickname}
        setNickname={setNickname}
      />
      <OnlyWithAudioCheckbox
        isConnectOnlyWithAudio={isConnectOnlyWithAudio}
        setIsConnectOnlyWithAudio={setIsConnectOnlyWithAudio}
      />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
}
