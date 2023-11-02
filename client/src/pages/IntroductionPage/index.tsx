import s from "./index.module.scss";
import webRtcLogo from "../../assets/webrtc.png";

export default function IntroductionPage() {
  return (
    <div className={s.pageContainer}>
      <div className={s.pagePanel}>
        <img className={s.pageImage} src={webRtcLogo} alt="webrtc" />
        Buttons
      </div>
    </div>
  );
}
