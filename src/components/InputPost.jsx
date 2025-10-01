import { useState } from "react";

const InputPost = ({
  title,
  value,
  onChange,
  placeholder = "받는 사람 이름을 입력해 주세요",
}) => {
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    onChange(e.target.value);
    if (e.target.value.trim().length > 0) {
      setShowError(false);
    }
  };

  const handleBlur = () => {
    if (value.trim().length < 1) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  return (
    <div className={`input-box ${showError ? "err" : ""}`}>
      <p className="tit txt-24-b mg-b12">{title}</p>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
      {showError && <p className="err-txt">값을 입력해 주세요.</p>}
    </div>
  );
};

export default InputPost;
