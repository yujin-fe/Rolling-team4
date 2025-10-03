import "./MessageCard.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getMessages } from "../api/message";
import Button from "../components/Button";
import { useModal } from "../contexts/ModalContext";

import Badge from "./Badge";
import MessageModal from "./MessageModal";

const relationMap = {
  친구: "friend",
  동료: "coworker",
  지인: "acquaintance",
  가족: "family",
};

const MessageCard = ({ recipientId }) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const { openModal, closeModal } = useModal();
  // 모달 오픈
  const handleOpen = (msg) => {
    openModal(<MessageModal data={msg} onClose={closeModal} />);
  };

  useEffect(() => {
    // recipientId가 변경될 때마다 메시지 불러오기
    getMessages(recipientId)
      .then((data) => {
        setMessages(data); // 서버에서 가져온 메시지 목록 저장
      })
      .finally(() => setLoading(false)); // 로딩 종료
  }, [recipientId]);

  if (loading) return <div className="message-card">Loading...</div>;
  if (!messages || messages.length === 0)
    return <div className="message-card">메시지가 없습니다.</div>;

  return (
    <div
      className="message-card-wrapper"
      style={{ backgroundColor: "#fff8ff" }} // 임시 색상
    >
      <div className="message-card add-message-card">
        <Link to="/message">
          <Button variant="add" />
        </Link>
      </div>
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`message-card ${msg.font}`}
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
                From. <span className="sender-name txt-20-b">{msg.sender}</span>
              </div>
              <Badge
                className="sender-relation"
                text={msg.relationship}
                relationType={relationMap[msg.relationship] || "other"}
              />
            </div>
          </div>

          {/* 내용 */}
          <p className="content txt-18">{msg.content}</p>

          {/* 생성일 */}
          <small className="date">
            {new Date(msg.createdAt).toLocaleDateString()}
          </small>
        </div>
      ))}
    </div>
  );
};

export default MessageCard;
