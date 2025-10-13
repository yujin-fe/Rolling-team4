import "./MessageCard.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getBackgroundData } from "../api/images";
import { deleteMessage, getMessages } from "../api/message";
import { deleteRecipient } from "../api/recipients";
import bin from "../assets/icons/deleted.png";
import { useModal } from "../contexts/ModalContext";

import AddMessageCard from "./AddMessageCard";
import Badge from "./Badge";
import Button from "./Button";
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

const MessageCard = ({
  recipientId,
  showAddCard = true,
  showDeleteCardBtn = false,
  showDeletePaperBtn = false,
  className = "",
}) => {
  const [messages, setMessages] = useState([]);
  const [bgColor, setBgColor] = useState();
  const [bgImage, setBgImage] = useState();
  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();
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

  // 메시지 삭제하기
  const handleDeleteMessage = async (msgId) => {
    try {
      await deleteMessage(msgId); // API 호출
      setMessages((prev) => prev.filter((msg) => msg.id !== msgId)); // UI에서 제거
    } catch (err) {
      console.error("❌ 메시지 삭제 실패:", err);
    }
  };

  // 롤링페이퍼 삭제하기
  const handleDeletePaper = async () => {
    if (!window.confirm("정말로 롤링페이퍼를 삭제하시겠습니까?")) return;

    try {
      await deleteRecipient(recipientId);
      alert("롤링페이퍼가 삭제되었습니다!");
      navigate("/list"); // ✅ 리스트 페이지로 이동
      setMessages([]);
    } catch (err) {
      console.error("❌ 롤링페이퍼 삭제 실패:", err);
    }
  };
  //HTML 태그를 텍스트로 변환
  const decodeHtmlEntities = (str) => {
    const doc = new DOMParser().parseFromString(String(str), "text/html");
    return doc.documentElement.textContent;
  };

  return (
    <div
      className="message-card-wrapper"
      style={{
        background: bgImage
          ? `url(${bgImage}) center/cover no-repeat`
          : bgColor
            ? `var(--${bgColor}-200)`
            : "white",
      }}
    >
      {/* 롤링페이퍼 삭제 버튼 */}
      {showDeletePaperBtn && (
        <div className="delete-paper-btn">
          <Button onClick={() => handleDeletePaper()}>
            롤링페이퍼 삭제하기
          </Button>
        </div>
      )}

      <div className={`message-cards ${className}`}>
        {/* 메시지 카드 추가 버튼 */}
        {showAddCard && <AddMessageCard recipientId={recipientId} />}

        {/* 메시지 카드*/}
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
                <div className="sender-name">
                  From. <span className="txt-20-b">{msg.sender}</span>
                </div>
                <Badge
                  className="sender-relation"
                  text={msg.relationship}
                  relationType={relationMap[msg.relationship] || "other"}
                />
              </div>
              {/* 메시지 카드 삭제 버튼 */}
              {showDeleteCardBtn && (
                <div>
                  <Button
                    icon={bin}
                    variant="outlined"
                    style={{ padding: "6px" }}
                    onClick={(e) => {
                      e.stopPropagation(); // 카드 클릭 이벤트 방지
                      handleDeleteMessage(msg.id);
                    }}
                  />
                </div>
              )}
            </div>

            {/* 내용 */}
            <div
              className={`content txt-18 ${fontMap[msg.font] || "font-noto-sans"}`}
            >
              {decodeHtmlEntities(msg.content)}
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
