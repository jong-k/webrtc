import { forwardRef } from "react";

export default forwardRef(function WebCamPlayer(
  props,
  ref: React.ForwardedRef<HTMLVideoElement>,
) {
  return (
    <div>
      <video ref={ref} autoPlay playsInline></video>
    </div>
  );
});
