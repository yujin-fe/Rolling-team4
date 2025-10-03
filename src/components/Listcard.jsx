import "./Listcard.scss";

import Profile from "./Profile";

const ListCard = ({
  name,
  messageCount,
  backgroundColor,
  reactionCount,
  profileImages,
  backgroundImageURL,
}) => {
  const isActive = true;
  return (
    <div
      className="card"
      style={{
        background: backgroundImageURL
          ? `url(${backgroundImageURL}) center/cover no-repeat`
          : backgroundColor,
      }}
    >
      <div className="popular_info">
        <h1 className={`card_name txt-24-b ${isActive ? "active" : ""}`}>
          To. {name}
        </h1>
        <Profile images={profileImages} />
        <div className={`message_count txt-14-b ${isActive ? "active" : ""}`}>
          {messageCount}명이 작성했어요!
        </div>
      </div>

      <div className="popular_reaction">
        <span className={`reaction_count font-wh ${isActive ? "active" : ""}`}>
          👍{reactionCount}
        </span>
        <span className={`reaction_count font-wh ${isActive ? "active" : ""}`}>
          😍{reactionCount}
        </span>
        <span className={`reaction_count font-wh ${isActive ? "active" : ""}`}>
          😥{reactionCount}
        </span>
      </div>
    </div>
  );
};

export default ListCard;
