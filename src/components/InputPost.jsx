import React from "react";
import { useState } from "react";

const PostInput = ({ title }) => {
  const [receiver, setReceiver] = useState("");
  const [showError, setShowError] = useState(false);

  const onChangeName = (e) => {
    setReceiver(e.target.value);
    if (receiver.trim().length < 1) {
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
    <div className="input-box">
      <p className="tit txt-24-b mg-b12">{title}</p>
      <input
        name="receive"
        type="text"
        value={receiver}
        onChange={onChangeName}
        onBlur={onBlurName}
        placeholder="받는 사람 이름을 입력해 주세요"
      />
      {showError && <p>값을 입력해 주세요.</p>}
    </div>
  );
};

export default PostInput;
