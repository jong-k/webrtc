import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import s from "./index.module.scss";
import JoinRoomTitle from "../../components/JoinRoomTitle";
import JoinRoomContent from "../../components/JoinRoomContent";
import { useHostStore } from "../../store";

export default function JoinRoomPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isRoomHost, setIsRoomHost } = useHostStore();

  useEffect(() => {
    const isHost = !!searchParams.get("host");
    if (isHost) setIsRoomHost(true);
  }, []);

  return (
    <div className={s.joinRoomPageContainer}>
      <div className={s.joinRoomPagePanel}>
        <JoinRoomTitle isRoomHost={isRoomHost} />
        <JoinRoomContent />
      </div>
    </div>
  );
}
