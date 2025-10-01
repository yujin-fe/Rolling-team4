import "./Modal.scss";
import { createContext, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";

const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    content: null,
  });

  const openModal = (content) => {
    setModalState({ isOpen: true, content });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, content: null });
  };

  useEffect(() => {
    if (modalState.isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [modalState.isOpen]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalState.isOpen &&
        ReactDOM.createPortal(
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {modalState.content}
            </div>
          </div>,
          document.getElementById("modal-root")
        )}
    </ModalContext.Provider>
  );
};
