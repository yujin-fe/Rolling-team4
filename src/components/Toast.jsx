import "./Toast.scss";
import { useEffect, useState } from "react";

const Toast = ({ message, onClose, duration = 5000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 400);
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`toast ${visible ? "show" : "hide"}`}>
      <span className="txt-16">{message}</span>
      <button className="toast-close" onClick={onClose}>
        <span className="blind">닫기</span>
      </button>
    </div>
  );
};

export default Toast;
