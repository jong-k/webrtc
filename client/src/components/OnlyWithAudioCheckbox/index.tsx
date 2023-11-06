import s from "./index.module.scss";
import checkImg from "../../assets/check.png";

interface OnlyWithAudioCheckboxProps {
  isConnectOnlyWithAudio: boolean;
  setIsConnectOnlyWithAudio: (isConnectOnlyWithAudio: boolean) => void;
}

export default function OnlyWithAudioCheckbox({
  isConnectOnlyWithAudio,
  setIsConnectOnlyWithAudio,
}: OnlyWithAudioCheckboxProps) {
  const handleChangeConnectionType = () => {
    setIsConnectOnlyWithAudio(!isConnectOnlyWithAudio);
  };

  return (
    <div className={s.checkboxContainer}>
      <div
        className={s.checkboxConnection}
        onClick={handleChangeConnectionType}
      >
        {isConnectOnlyWithAudio && (
          <img
            className={s.checkboxImage}
            src={checkImg}
            alt="checkbox image"
          />
        )}
      </div>
      <p className={s.checkboxContainerParagraph}>Only Audio</p>
    </div>
  );
}
