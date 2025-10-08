import "./MessageCard.scss";
import { useEffect, useState } from "react";

import { getBackgroundData } from "../api/images";
import { getMessages } from "../api/message";
import { useModal } from "../contexts/ModalContext";

import AddMessageCard from "./AddMessageCard";
import Badge from "./Badge";
import MessageModal from "./MessageModal";

const relationMap = {
  친구: "friend",
  동료: "coworker",
  지인: "acquaintance",
  가족: "family",
};

const fontMap = {
  "Noto Sans": "font-noto-sans",
  Pretendard: "font-pretendard",
  나눔명조: "font-nanum-myeongjo",
  "나눔손글씨 손편지체": "font-nanum-handwriting",
};

const MessageCard = ({ recipientId, showAddCard = true }) => {
  const [messages, setMessages] = useState([]);
  const [bgColor, setBgColor] = useState();
  const [bgImage, setBgImage] = useState();
  const { openModal, closeModal } = useModal();

  // 모달 오픈
  const handleOpen = (msg) => {
    openModal(<MessageModal data={msg} onClose={closeModal} />);
  };

  // 배경 데이터 가져오기
  useEffect(() => {
    const fetchBackground = async () => {
      if (!recipientId) return;

      try {
        const { backgroundImage, backgroundColor } =
          await getBackgroundData(recipientId);
        setBgImage(backgroundImage);
        setBgColor(backgroundColor);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBackground();
  }, [recipientId]);

  // 메시지 가져오기
  useEffect(() => {
    if (!recipientId) return;

    const fetchMessages = async () => {
      try {
        const data = await getMessages(recipientId);
        setMessages(data.results);
      } catch (err) {
        console.error("❌ 메시지 불러오기 실패:", err);
        setMessages([]); // 실패 시 안전하게 초기화
      }
    };
    fetchMessages();
  }, [recipientId]);

  return (
    <div
      className="message-card-wrapper"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
        backgroundColor: bgColor ? `var(--${bgColor}-200)` : "white",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="message-cards">
        {/* ✅ showAddCard가 true일 때만 렌더 */}
        {showAddCard && <AddMessageCard recipientId={recipientId} />}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-card message-card`}
            onClick={() => handleOpen(msg)}
          >
            <div className="message-card-top">
              {/* 프로필 이미지 */}
              <img
                className="profile-img"
                src={msg.profileImageURL}
                alt={msg.sender}
              />
              {/* 보낸 사람 + 관계 */}
              <div className="sender txt-20">
                <div>
                  From.{" "}
                  <span className="sender-name txt-20-b">{msg.sender}</span>
                </div>
                <Badge
                  className="sender-relation"
                  text={msg.relationship}
                  relationType={relationMap[msg.relationship] || "other"}
                />
              </div>
            </div>

            {/* 내용 */}
            <div
              className={`content txt-18 ${fontMap[msg.font] || "font-noto-sans"}`}
              // dangerouslySetInnerHTML={{ __html: msg.content }}
            >
              {msg.content.replace(/<[^>]+>/g, "")}
            </div>
            {/* 생성일 */}
            <small className="date">
              {new Date(msg.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageCard;
