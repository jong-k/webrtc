import s from "./index.module.scss";
import webRtcLogo from "../../assets/webrtc.png";
import ConnectingButtonBox from "../../components/ConnectingButtonBox";

export default function IntroPage() {
  return (
    <div className={s.pageContainer}>
      <div className={s.pagePanel}>
        <img className={s.pageImage} src={webRtcLogo} alt="webrtc" />
        <ConnectingButtonBox />
      </div>
    </div>
  );
}
