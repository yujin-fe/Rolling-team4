import "./Emoji.css";

const Emoji = ({ emoji, count }) => {
  return (
    <div className="Emoji">
      <div className="emoji_emoji">{emoji}</div>
      <div className="emoji_count">{count}</div>
    </div>
  );
};

export default Emoji;
