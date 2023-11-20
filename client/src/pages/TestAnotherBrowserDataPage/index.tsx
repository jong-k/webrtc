// import { useState } from "react";
// import s from "./index.module.scss";

// interface TextareaData {
//   isDisabled: boolean;
//   placeholderValue: string;
//   value: string;
// }

// interface SDPMessage {
//   type: string;
//   candidate: string | null;
//   sdpMid?: string | null;
//   sdpMLineIndex?: number | null;
// }

// const PLACEHOLDER_TEXT = "시작 버튼을 누르고 텍스트 입력 후 전송하세요";

// export default function TestAnotherBrowserDataPage() {
//   // BroadcastChannel API : same origin의 각 채널들(브라우저 탭, 창, 프레임, iframe 등) 간 통신할 수 있게 해줌
//   const signaling = new BroadcastChannel("webrtc");
//   signaling.onmessage = (e: MessageEvent) => {
//     switch (e.data.type) {
//       case "offer":
//     }
//   };
//   const [sendTextareaData, setSendTextareaData] = useState<TextareaData>({
//     isDisabled: true,
//     placeholderValue: PLACEHOLDER_TEXT,
//     value: "",
//   });
//   const [receiveTextareaData, setReceiveTextareaData] = useState<TextareaData>({
//     isDisabled: true,
//     placeholderValue: "",
//     value: "",
//   });
//   const [sendChannel, setSendChannel] = useState<RTCDataChannel | null>(null);
//   const [receiveChannel, setReceiveChannel] = useState<RTCDataChannel | null>(
//     null,
//   );

//   // FIXME: 일단 스테이트 초기값에서 rtc peer connection 빼기
//   const [localPeerConnection, setLocalPeerConnection] =
//     useState<RTCPeerConnection | null>(new RTCPeerConnection());
//   const [remotePeerConnection, setRemotePeerConnection] =
//     useState<RTCPeerConnection | null>(new RTCPeerConnection());

//   function getOtherPeer(peerConnection: RTCPeerConnection) {
//     return peerConnection === localPeerConnection
//       ? remotePeerConnection
//       : localPeerConnection;
//   }

//   async function handleOffer(offer) {
//     // 일단 offer 다시 보낼 수 없음.. 끊고 다시 보내야 함
//     // if (localPeerConnection !== null) {
//     //   window.alert("이미 존재하는 peer connection입니다");
//     //   return;
//     // }
//     if (remotePeerConnection) {
//       remotePeerConnection.onicecandidate = handleConnect;
//       remotePeerConnection.ondatachannel = (e: RTCDataChannelEvent) => {
//         const channel = e.channel;
//         setReceiveChannel(channel);
//         channel.onmessage = (e: MessageEvent) => {
//           setReceiveTextareaData({ ...receiveTextareaData, value: e.data });
//         };
//         remotePeerConnection.remoteDescription(offer);
//       };
//     }
//   }

//   // ice candidate 이벤트 발생 시 offer or answer sdp 전달
//   function handleConnect(e: RTCPeerConnectionIceEvent) {
//     const message: SDPMessage = {
//       type: "candidate",
//       candidate: null,
//     };
//     if (e.candidate) {
//       message.candidate = e.candidate.candidate;
//       message.sdpMid = e.candidate.sdpMid;
//       message.sdpMLineIndex = e.candidate.sdpMLineIndex;
//     }
//     signaling.postMessage(message);
//   }

//   async function createConnection() {
//     if (localPeerConnection) {
//       // PC를 만들고 PC에 ice candidate 이벤트 핸들러 부착
//       localPeerConnection.onicecandidate = handleConnect;
//       setSendChannel(localPeerConnection.createDataChannel("sendDatachannel"));
//       if (sendChannel) {
//         sendChannel.onmessage = (e: MessageEvent) => {
//           setReceiveTextareaData(e.data);
//         };

//         const offer = await localPeerConnection.createOffer();
//         signaling.postMessage({ type: "offer", sdp: offer.sdp });
//         await localPeerConnection.setLocalDescription(offer);
//       }
//     }
//   }

//   function sendData() {
//     const data = sendTextareaData.value;
//     if (sendChannel) {
//       sendChannel.send(data);
//     } else if (receiveChannel) {
//       receiveChannel.send(data);
//     }
//   }

//   async function hangup() {
//     if (localPeerConnection) {
//       localPeerConnection.close();
//       setLocalPeerConnection(null);
//     }
//     setSendChannel(null);
//     setReceiveChannel(null);
//     setSendTextareaData({ ...sendTextareaData, value: "" });
//     setReceiveTextareaData({ ...receiveTextareaData, value: "" });
//   }

//   return (
//     <div>
//       <h2>RTC Another Browser Test</h2>
//       <button type="button" onClick={createConnection}>
//         test
//       </button>
//       <div className={s.textareaBox}>
//         <textarea
//           className={s.textarea}
//           cols={40}
//           rows={10}
//           placeholder={sendTextareaData.placeholderValue}
//           disabled={sendTextareaData.isDisabled}
//           value={sendTextareaData.value}
//           onChange={(e) =>
//             setSendTextareaData({ ...sendTextareaData, value: e.target.value })
//           }
//         />
//         <textarea
//           className={s.textarea}
//           cols={40}
//           rows={10}
//           disabled={receiveTextareaData.isDisabled}
//           placeholder={receiveTextareaData.placeholderValue}
//           value={receiveTextareaData.value}
//         />
//       </div>
//       <div className={s.buttonBox}>
//         <button className={s.button} type="button" onClick={createConnection}>
//           시작
//         </button>
//         <button className={s.button} type="button" onClick={sendData}>
//           ✉️
//         </button>
//         <button className={s.button} type="button" onClick={hangup}>
//           ❌
//         </button>
//       </div>
//     </div>
//   );
// }
