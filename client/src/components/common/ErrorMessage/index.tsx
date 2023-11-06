import s from "./index.module.scss";

interface ErrorMessageProps {
  errorMessage?: string;
}

export default function ErrorMessage({
  errorMessage = "회의실을 찾을 수 없습니다",
}: ErrorMessageProps) {
  return (
    <div className={s.errorMessageContainer}>
      <p className={s.errorMessageParagraph}>{errorMessage}</p>
    </div>
  );
}
