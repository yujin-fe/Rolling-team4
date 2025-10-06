import "./ReactionBtn.scss";

import arrowBtn from "../assets/icons/btn_arrow_gray.svg";

import Emoji from "./Emoji";

const ReactionBtn = ({ reactionsData, recipientData, handleReactions, isOpened, onClickLoadMore }) => {
  
  return (
    <div className="reaction-wrapper">
      <div className="badges">
        {recipientData?.topReactions?.map((emoji) => (
          <Emoji key={emoji.id} emoji={emoji.emoji} count={emoji.count} />
        ))}
      </div>
      <button className="reaction-window-btn" onClick={handleReactions}>
        <img
          src={arrowBtn}
          style={{
            transform: isOpened ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      {isOpened && (
        <div className="reaction-window">
          <div className="badge-grid">
            {reactionsData?.results?.map(
              (reaction, ind) =>
                ind > 2 && (
                  <Emoji
                    key={reaction.id}
                    emoji={reaction.emoji}
                    count={reaction.count}
                  />
                )
            )}
          </div>
          <button
            onClick={() => {
              onClickLoadMore();
              if (reactionsData?.results?.length === reactionsData?.count) {
                handleReactions();
              }
            }}
          >
            <img
              src={arrowBtn}
              style={{
                transform:
                  reactionsData.results.length === reactionsData.count
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
              }}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReactionBtn;
