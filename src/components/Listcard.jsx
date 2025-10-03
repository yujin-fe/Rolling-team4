import "./Listcard.scss";

import Profile from "./Profile";

const ListCard = ({
  name,
  messageCount,
  backgroundColor,
  profileImages,
  backgroundImageURL,
  reactions = [],
}) => {
  const isActive = true;

  return (
    <div
      className="card"
      style={{
        background: backgroundImageURL
          ? `url(${backgroundImageURL}) center/cover no-repeat`
          : `var(--${backgroundColor}-200)`,
      }}
    >
      <div className="popular_info">
        <h1
          className={`card_name txt-24-b ${backgroundImageURL ? "has-bg" : ""}`}
        >
          To. {name}
        </h1>
        <Profile images={profileImages} />
        <div
          className={`message_count txt-14-b ${backgroundImageURL ? "has-bg" : ""}`}
        >
          {messageCount}명이 작성했어요!
        </div>
      </div>

      <div className="popular_reaction">
        {reactions.length > 0 ? (
          reactions.map((r) => (
            <span
              key={r.id}
              className={`reaction_count font-wh ${isActive ? "active" : ""}`}
            >
              {r.emoji} {r.count}
            </span>
          ))
        ) : (
          <span className="reaction_none">리액션 없음</span>
        )}
      </div>
    </div>
  );
};

export default ListCard;
