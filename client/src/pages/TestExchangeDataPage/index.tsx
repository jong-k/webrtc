import { useState } from "react";
import s from "./index.module.scss";

interface TextareaData {
  isDisabled: boolean;
  placeholderValue: string;
  value: string;
}

const PLACEHOLDER_TEXT = "시작 버튼을 누르고 텍스트 입력 후 전송하세요";

export default function TestExchangeDataPage() {
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
  const [sendChannel, setSendChannel] = useState<RTCDataChannel | null>(null);
  const [receiveChannel, setReceiveChannel] = useState<RTCDataChannel>();

  const [localPeerConnection, setLocalPeerConnection] =
    useState<RTCPeerConnection | null>(new RTCPeerConnection());
  const [remotePeerConnection, setRemotePeerConnection] =
    useState<RTCPeerConnection | null>(new RTCPeerConnection());

  const getOtherPeer = (peerConnection: RTCPeerConnection) => {
    return peerConnection === localPeerConnection
      ? remotePeerConnection
      : localPeerConnection;
  };

  const handleConnect = (e: RTCPeerConnectionIceEvent) => {
    const peerConnection = e.target;
    const iceCandidate = e.candidate;

    if (iceCandidate) {
      const otherPeer = getOtherPeer(peerConnection as RTCPeerConnection);

      otherPeer?.addIceCandidate(iceCandidate);
    }
  };

  const handleDataChannel = (e: RTCDataChannelEvent) => {
    setReceiveChannel(e.channel); // useState 비동기 동작 문제로 인해 아래에서 e.channel에 직접 메시지 이벤트 핸들러 부착
    // MessageEvent<T> 의 T 에 나중에 타입 달아야 할 수 있음
    e.channel.onmessage = (e: MessageEvent) => {
      setReceiveTextareaData({ ...receiveTextareaData, value: e.data });
    };
  };

  const createConnection = async () => {
    try {
      setSendTextareaData({ ...sendTextareaData, placeholderValue: "" });
      if (localPeerConnection && remotePeerConnection) {
        setSendChannel(
          localPeerConnection.createDataChannel("sendDataChannel"),
        );

        localPeerConnection.onicecandidate = handleConnect;
        remotePeerConnection.onicecandidate = handleConnect;
        remotePeerConnection.ondatachannel = handleDataChannel;

        const offer = await localPeerConnection.createOffer();
        await localPeerConnection.setLocalDescription(offer);
        await remotePeerConnection.setRemoteDescription(offer);

        const answer = await remotePeerConnection.createAnswer();
        await remotePeerConnection.setLocalDescription(answer);
        await localPeerConnection.setRemoteDescription(answer);
        setSendTextareaData({ ...sendTextareaData, isDisabled: false });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendData = () => {
    if (sendChannel) {
      sendChannel.send(sendTextareaData.value); // string 이외의 배열, 객체 등은 JSON 파싱 필요
    }
  };
  const closeDataChannels = () => {
    if (sendChannel) sendChannel.close();
    if (receiveChannel) receiveChannel.close();
    if (localPeerConnection) {
      localPeerConnection.close();
      setLocalPeerConnection(null);
    }
    if (remotePeerConnection) {
      remotePeerConnection.close();
      setRemotePeerConnection(null);
    }
    setSendTextareaData({
      isDisabled: true,
      placeholderValue: PLACEHOLDER_TEXT,
      value: "",
    });
    setReceiveTextareaData({
      ...receiveTextareaData,
      value: "",
    });
  };

  return (
    <div>
      <h2>RTC Data Channel Test</h2>
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
        <button className={s.button} type="button" onClick={createConnection}>
          시작
        </button>
        <button className={s.button} type="button" onClick={sendData}>
          ✉️
        </button>
        <button className={s.button} type="button" onClick={closeDataChannels}>
          ❌
        </button>
      </div>
    </div>
  );
}
