import "./Toggle.scss";

const Toggle = ({ leftText, rightText, value, onChange }) => {
  return (
    <div className="Toggle">
      <button
        className={`Toggle_btn ${value === "color" ? "active" : ""}`}
        onClick={() => onChange("color")}
      >
        {leftText}
      </button>
      <button
        className={`Toggle_btn ${value === "image" ? "active" : ""}`}
        onClick={() => onChange("image")}
      >
        {rightText}
      </button>
    </div>
  );
};

export default Toggle;
