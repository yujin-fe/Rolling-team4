import "./Listcard.scss";

import Profile from "./Profile";

const ListCard = ({
  reaction,
  name,
  messageCount,
  backgroundColor,
  profileImages,
  backgroundImageURL,
}) => {
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
        {reaction && (
          <span className="reaction_count font-wh">
            {reaction.emoji} {reaction.count}
          </span>
        )}
      </div>
    </div>
  );
};

export default ListCard;
