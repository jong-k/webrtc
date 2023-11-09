import { useState, useRef } from "react";
// import adapter from "webrtc-adapter";
import s from "./index.module.scss";
import WebCamPlayer from "../../components/WebCamPlayer";

// const SERVER_CONFIG = {
//   iceServers: [
//     {
//       urls: [
//         "stun:stun.l.google.com:19302",
//         "stun:stun1.l.google.com:19302",
//         "stun:stun2.l.google.com:19302",
//         "stun:stun3.l.google.com:19302",
//         "stun:stun4.l.google.com:19302",
//       ],
//     },
//   ],
// };

export default function TestShareWebCamPage() {
  const [localPeerConnection, setLocalPeerConnection] =
    useState<RTCPeerConnection | null>(new RTCPeerConnection());
  const [remotePeerConnection, setRemotePeerConnection] =
    useState<RTCPeerConnection | null>(new RTCPeerConnection());
  const [localStream, setLocalStream] = useState<MediaStream>();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const getOtherPeer = (peerConnection: RTCPeerConnection) => {
    return peerConnection === localPeerConnection
      ? remotePeerConnection
      : localPeerConnection;
  };

  const handleConnect = (e: RTCPeerConnectionIceEvent) => {
    const peerConnection = e.target; // 이벤트가 발생한 pc
    const iceCandidate = e.candidate; // pc의 ice candidate (local 이면 remote)

    if (iceCandidate) {
      const newIceCandidate = new RTCIceCandidate(iceCandidate);
      const otherPeer = getOtherPeer(peerConnection as RTCPeerConnection);

      otherPeer?.addIceCandidate(newIceCandidate);
    }
  };

  // ok
  const handleStartStream = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setLocalStream(videoStream);
      if (localVideoRef.current) localVideoRef.current.srcObject = videoStream;
    } catch (err) {
      console.log(err);
    }
  };

  // 다른 피어 커넥션에서 데이터 받아와야 함
  const handleStartCall = async () => {
    try {
      if (localPeerConnection && remotePeerConnection) {
        localPeerConnection.onicecandidate = handleConnect;

        remotePeerConnection.onicecandidate = handleConnect;
        // remote PC의 add stream 이벤트 리스너 -> ontrack 마이그레이션
        remotePeerConnection.ontrack = (e: RTCTrackEvent) => {
          const mediaStream = e.streams[0];
          if (remoteVideoRef.current)
            remoteVideoRef.current.srcObject = mediaStream;
        };

        // localPeerConnection 에 video stream 담기
        localStream
          ?.getTracks()
          .forEach((track) => localPeerConnection.addTrack(track, localStream));

        const offer = await localPeerConnection.createOffer({
          offerToReceiveVideo: true,
        });
        await localPeerConnection.setLocalDescription(offer);
        await remotePeerConnection.setRemoteDescription(offer);

        const answer = await remotePeerConnection.createAnswer();
        await remotePeerConnection.setLocalDescription(answer);
        await localPeerConnection.setRemoteDescription(answer);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEndCall = () => {
    localPeerConnection?.close();
    remotePeerConnection?.close();
    setLocalPeerConnection(null);
    setRemotePeerConnection(null);
  };

  return (
    <div>
      <h2>RTC PeerConnection 간 통신</h2>
      <div className={s.buttonBox}>
        <button className={s.button} type="button" onClick={handleStartStream}>
          시작
        </button>
        <button className={s.button} type="button" onClick={handleStartCall}>
          📞
        </button>
        <button className={s.button} type="button" onClick={handleEndCall}>
          ❌
        </button>
      </div>
      <div>
        <WebCamPlayer ref={localVideoRef} />
        <WebCamPlayer ref={remoteVideoRef} />
      </div>
    </div>
  );
}
