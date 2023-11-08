import { forwardRef } from "react";
import s from "./index.module.scss";

export default forwardRef(function WebCamPlayer(
  props,
  ref: React.ForwardedRef<HTMLVideoElement>,
) {
  return (
    <div>
      <video className={s.player} ref={ref} autoPlay playsInline></video>
    </div>
  );
});
