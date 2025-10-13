import "./Modal.scss";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ReactDOM from "react-dom";

const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    content: null,
  });

  const openModal = useCallback((content) => {
    setModalState({ isOpen: true, content });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ isOpen: false, content: null });
  }, []);

  const value = useMemo(
    () => ({ openModal, closeModal }),
    [openModal, closeModal]
  );

  useEffect(() => {
    if (modalState.isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [modalState.isOpen]);

  return (
    <ModalContext.Provider value={value}>
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
