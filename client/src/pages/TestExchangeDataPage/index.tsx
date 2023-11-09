import s from "./index.module.scss";

export default function TestExchangeDataPage() {
  return (
    <div>
      <h2>RTC Data Channel Test</h2>
      <div className={s.textareaBox}>
        <textarea className={s.textarea} cols={40} rows={10}></textarea>
        <textarea className={s.textarea} cols={40} rows={10}></textarea>
      </div>
      <div className={s.buttonBox}>
        <button className={s.button} type="button">
          시작
        </button>
        <button className={s.button} type="button">
          ✉️
        </button>
        <button className={s.button} type="button">
          ❌
        </button>
      </div>
    </div>
  );
}
