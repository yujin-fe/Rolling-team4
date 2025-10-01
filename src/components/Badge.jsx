import "./Badge.scss";

const Badge = ({ text, relationType }) => {
  return <div className={`Badge ${relationType}`}>{text}</div>;
};

export default Badge;
