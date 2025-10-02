import "./MessageModal.scss";

const MessageModal = ({ data, onClose }) => {
  const { profileImageURL, sender, relationship, createdAt, content } = data;

  return (
    <div className="message-modal">
      <div className="message-header">
        <img src={profileImageURL} alt={sender} className="profile" />
        <div className="info">
          <div className="sender">
            <span className="txt-20">From.</span>
            <span className="txt-20-b"> {sender}</span>
          </div>
          <span className="relationship">{relationship}</span>
        </div>
        <span className="createdAt txt-14">
          {new Date(createdAt).toLocaleDateString("ko-KR")}
        </span>
      </div>

      <div className="body">
        <p>{content}</p>
      </div>

      <div className="footer">
        <button className="btn-confirm" onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default MessageModal;
