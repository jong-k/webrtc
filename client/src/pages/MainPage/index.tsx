import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div>
      <h2>WebRTC</h2>
      <Link to="./testwebcam">웹 캠 테스트</Link>
    </div>
  );
}
