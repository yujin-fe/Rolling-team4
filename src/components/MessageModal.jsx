import "./MessageModal.scss";

import Badge from "./Badge";

const fontMap = {
  "Noto Sans": "font-noto-sans",
  Pretendard: "font-pretendard",
  나눔명조: "font-nanum-myeongjo",
  "나눔손글씨 손편지체": "font-nanum-handwriting",
};

const relationMap = {
  친구: "friend",
  동료: "coworker",
  지인: "acquaintance",
  가족: "family",
};

const MessageModal = ({ data, onClose }) => {
  const { profileImageURL, sender, relationship, createdAt, content, font } =
    data;
  console.log("datas", data);

  return (
    <div className="message-modal">
      <div className="message-header">
        <img src={profileImageURL} alt={sender} className="profile" />
        <div className="info">
          <div className="sender">
            <span className="txt-20">From.</span>
            <span className="txt-20-b"> {sender}</span>
          </div>
          {/* <span className="relationship">{relationship}</span> */}
          <Badge
            className="relationship"
            text={relationship}
            relationType={relationMap[relationship] || ""}
          />
        </div>
        <span className="createdAt txt-14">
          {/* 임시 날짜 포멧팅 */}
          {new Date(createdAt).toLocaleDateString("ko-KR")}
        </span>
      </div>

      <div className="body">
        <div
          className={`txt-18 ${fontMap[font] || ""}`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
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
