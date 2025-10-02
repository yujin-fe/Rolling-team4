import "./Emoji.scss";

const Emoji = ({ emoji, count, color = "#fff", ...props }) => {
  return (
    <div className="Emoji" {...props}>
      <div className="emoji_emoji txt-16">{emoji}</div>
      <div className="emoji_count txt-16" style={{ color: color }}>
        {count}
      </div>
    </div>
  );
};

export default Emoji;
