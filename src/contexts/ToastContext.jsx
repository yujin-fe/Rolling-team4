import { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom";

import Toast from "../components/Toast";

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast({ message });
  };
  const closeToast = () => setToast(null);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast &&
        ReactDOM.createPortal(
          <Toast message={toast.message} onClose={closeToast} />,
          document.getElementById("toast-root")
        )}
    </ToastContext.Provider>
  );
};
