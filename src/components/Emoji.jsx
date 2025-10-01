import "./Emoji.scss";

const Emoji = ({ emoji, count, color = "#fff", ...props }) => {
  return (
    <div className="Emoji" {...props}>
      <div className="emoji_emoji">{emoji}</div>
      <div className="emoji_count" style={{ color: color }}>
        {count}
      </div>
    </div>
  );
};

export default Emoji;
