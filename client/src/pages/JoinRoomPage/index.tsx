import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import s from "./index.module.scss";

export default function JoinRoomPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const isRoomHost = searchParams.get("host");
    if (isRoomHost) console.log("host!!");
  }, []);

  return (
    <div className={s.joinRoomPageContainer}>
      <div className={s.joinRoomPagePanel}></div>
    </div>
  );
}
