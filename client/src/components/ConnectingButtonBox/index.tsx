import { useNavigate } from "react-router-dom";
import ConnectingButton from "../ConnectingButton";
import s from "./index.module.scss";

// interface ConnectingButtonBoxProps {}

export default function ConnectingButtonBox() {
  const navigate = useNavigate();

  const pushToJoinRoomPage = () => {
    navigate("/join-room");
  };

  const pushToJoinRoomPageAsHost = () => {
    navigate("/join-room?host=true");
  };

  return (
    <div className={s.connectingButtonContainer}>
      <ConnectingButton
        buttonText="Join a meeting"
        handleClick={pushToJoinRoomPage}
      />
      <ConnectingButton
        hasCreateRoomButton
        buttonText="Host a meeting"
        handleClick={pushToJoinRoomPageAsHost}
      />
    </div>
  );
}
