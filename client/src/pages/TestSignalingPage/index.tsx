import { useState, useEffect } from "react";
import s from "./index.module.scss";
import { socket } from "../../socket";

interface TextareaData {
  isDisabled: boolean;
  placeholderValue: string;
  value: string;
}

interface SDPMessage {
  type: string;
  candidate: string | null;
  sdpMid?: string | null;
  sdpMLineIndex?: number | null;
}

const PLACEHOLDER_TEXT = "시작 버튼을 누르고 텍스트 입력 후 전송하세요";

export default function TestSignalingPage() {
  const [sendTextareaData, setSendTextareaData] = useState<TextareaData>({
    isDisabled: true,
    placeholderValue: PLACEHOLDER_TEXT,
    value: "",
  });
  const [receiveTextareaData, setReceiveTextareaData] = useState<TextareaData>({
    isDisabled: true,
    placeholderValue: "",
    value: "",
  });
  const [isChannelReady, setIsChannelReady] = useState(false);
  const [isInitiator, setIsInitiator] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);

  const sendData = () => {
    sendMessage("got user text");
    if (isInitiator) maybeStart();
  };

  const stop = () => {
    setIsStarted(false);
    peerConnection?.close();
    setPeerConnection(null);
  };

  const hangup = () => {
    stop();
    sendMessage("bye");
  };

  const sendMessage = (message: any) => {
    console.log("Client sending message: ", message);
    socket.emit("message", message);
  };

  const doCall = async () => {
    console.log("Sending offer to peer");
    if (peerConnection) {
      const offer = await peerConnection.createOffer();
      peerConnection.setLocalDescription(offer);
      console.log("setLocalAndSendMessage sending message", offer);
      sendMessage(offer);
    }
  };

  const doAnswer = async () => {
    console.log("Sending answer to peer.");
    try {
      if (peerConnection) {
        const answer = await peerConnection.createAnswer();
        peerConnection.setLocalDescription(answer);
        console.log("setLocalAndSendMessage sending message", answer);
        sendMessage(answer);
      }
    } catch (err) {
      console.log("fail to answer", err);
    }
  };

  const handleIceCandidate = (e: RTCPeerConnectionIceEvent) => {
    console.log("icecandidate event: ", e);
    if (e.candidate) {
      sendMessage({
        type: "candidate",
        label: e.candidate.sdpMLineIndex,
        id: e.candidate.sdpMid,
        candidate: e.candidate.candidate,
      });
    } else {
      console.log("End of candidates.");
    }
  };

  const createPeerConnection = () => {
    try {
      setIsInitiator(true);
      setIsChannelReady(true);
      setPeerConnection(new RTCPeerConnection());
      if (peerConnection) {
        peerConnection.onicecandidate = handleIceCandidate;
        console.log("Created RTCPeerConnnection");
      }
    } catch (err) {
      console.log("Failed to create PeerConnection, exception: " + err);
      alert("Cannot create RTCPeerConnection object.");
      return;
    }
  };

  const maybeStart = () => {
    console.log(">>>>>>> maybeStart() ", isStarted, isChannelReady);
    if (!isStarted && isChannelReady) {
      console.log(">>>>>> creating peer connection");
      createPeerConnection();
      setIsStarted(true);
      console.log("isInitiator", isInitiator);
      if (isInitiator) {
        doCall();
      }
    }
  };

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("client received message: ", message);
      if (message.type === "offer") {
        if (!isInitiator && !isStarted) maybeStart();
        if (peerConnection) {
          peerConnection.setRemoteDescription(
            new RTCSessionDescription(message), // await 안쓰고 이렇게 함..
          );
          doAnswer();
        }
      } else if (message.type === "answer" && isStarted) {
        if (peerConnection) {
          peerConnection.setRemoteDescription(
            new RTCSessionDescription(message),
          );
        }
      } else if (message.type === "candidate" && isStarted) {
        if (peerConnection) {
          const candidate = new RTCIceCandidate({
            sdpMLineIndex: message.label,
            candidate: message.candidate,
          });
          peerConnection.addIceCandidate(candidate);
        }
      } else if (message === "bye" && isStarted) {
        console.log("Session terminated.");
        stop();
        setIsInitiator(false);
      }
    });
  }, []);

  return (
    <div>
      <h2>RTC Signaling Test</h2>
      <div className={s.textareaBox}>
        <textarea
          className={s.textarea}
          cols={40}
          rows={10}
          placeholder={sendTextareaData.placeholderValue}
          disabled={sendTextareaData.isDisabled}
          value={sendTextareaData.value}
          onChange={(e) =>
            setSendTextareaData({ ...sendTextareaData, value: e.target.value })
          }
        />
        <textarea
          className={s.textarea}
          cols={40}
          rows={10}
          disabled={receiveTextareaData.isDisabled}
          placeholder={receiveTextareaData.placeholderValue}
          value={receiveTextareaData.value}
        />
      </div>
      <div className={s.buttonBox}>
        <button
          className={s.button}
          type="button"
          onClick={createPeerConnection}
        >
          시작
        </button>
        <button className={s.button} type="button" onClick={sendData}>
          ✉️
        </button>
        <button className={s.button} type="button" onClick={hangup}>
          ❌
        </button>
      </div>
    </div>
  );
}
