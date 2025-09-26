import "./Badge.css";

const Badge = ({ text, type }) => {
  return <div className={`Badge ${type}`}>{text}</div>;
};

export default Badge;
