import Emoji from "./Emoji";

const ReactionWindow = ({ data, onClickLoadMore }) => {

  return (
    <div className="reaction-window">
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
      <button onClick={onClickLoadMore}>버튼</button>
    </div>
  );
};

export default ReactionWindow;
