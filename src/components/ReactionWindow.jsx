import "./ReactionWindow.scss";

import arrowBtn from "../assets/icons/btn_arrow_gray.svg";

import Emoji from "./Emoji";

const ReactionWindow = ({ data, onClickLoadMore, onClickGetReactions }) => {
  return (
    <div className="reaction-window">
      <div className="badge-grid">
        {data?.results?.map(
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
          if (data.results.length === data.count) {
            onClickGetReactions();
          }
        }}
      >
        <img
          src={arrowBtn}
          style={{
            transform:
              data.results.length === data.count
                ? "rotate(180deg)"
                : "rotate(0deg)",
          }}
        />
      </button>
    </div>
  );
};

export default ReactionWindow;
