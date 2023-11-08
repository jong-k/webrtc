import { useEffect, useRef } from "react";
import WebCamPlayer from "../../components/WebCamPlayer";

export default function TestWebCamPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mediaStreamConstraints = {
      video: true, // -> 간단히 이렇게도 가능
      // video: {
      //   width: {
      //     min: 1280,
      //   },
      //   height: {
      //     min: 720,
      //   },
      // },
    };

    navigator.mediaDevices
      .getUserMedia(mediaStreamConstraints)
      .then((mediaStream) => {
        if (videoRef.current) videoRef.current.srcObject = mediaStream;
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>웹 캠 테스트 (3초 정도 필요)</h2>
      <WebCamPlayer ref={videoRef} />
    </div>
  );
}
