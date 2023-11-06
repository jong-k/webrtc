import s from "./index.module.scss";
import checkImg from "../../assets/check.png";

export default function OnlyWithAudioCheckbox() {
  const handleChangeConnectionType = () => {};

  return (
    <div className={s.checkboxContainer}>
      <div
        className={s.checkboxConnection}
        onClick={handleChangeConnectionType}
      >
        <img className={s.checkboxImage} src={checkImg} alt="checkbox image" />
      </div>
      <p className={s.checkboxContainerParagraph}>Only Audio</p>
    </div>
  );
}
