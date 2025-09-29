import { useState } from "react";

const InputPost = ({ title, receiver, setReceiver }) => {
  const [showError, setShowError] = useState(false);

  const onChangeName = (e) => {
    setReceiver(e.target.value);
    if (e.target.value.trim().length > 0) {
      setShowError(false);
    }
  };

  const onBlurName = () => {
    if (receiver.trim().length < 1) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  return (
    <div className={`input-box ${showError ? "err" : ""}`}>
      <p className="tit txt-24-b mg-b12">{title}</p>
      <input
        name="receive"
        type="text"
        value={receiver}
        onChange={onChangeName}
        onBlur={onBlurName}
        placeholder="받는 사람 이름을 입력해 주세요"
      />
      {showError && <p className="err-txt">값을 입력해 주세요.</p>}
    </div>
  );
};

export default InputPost;
