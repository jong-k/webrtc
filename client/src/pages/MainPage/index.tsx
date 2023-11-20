import { Link } from "react-router-dom";
import s from "./index.module.scss";

export default function MainPage() {
  return (
    <div>
      <h2>WebRTC</h2>
      <div className={s.linkBox}>
        <Link to="./testwebcam">1. 웹 캠 테스트</Link>
        <Link to="./testsharewebcam">
          2. RTC PeerConnection 간 웹 캠 통신 테스트
        </Link>
        <Link to="./testexchangedata">3. Data Channel 통신 테스트</Link>
        <Link to="./testsignaling">4. 시그널링 서버 연결 테스트</Link>
      </div>
    </div>
  );
}
