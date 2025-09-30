/*
<Button 
      variant = "primary" // primary / secondary / outlined / add
      size = "lg"  // full / lg / wd / md / sm
      text="확인"
      icon = {isDisabled ? <아이콘1 /> : <아이콘2 /> }
      disabled = {isDisabled}
/>
*/

function Button({
  variant = "primary",
  text,
  size = "md",
  icon,
  onClick,
  disabled = false,
}) {
  return (
    <button
      type="button"
      className={`btn ${variant} ${size} ${icon ? "has-icon" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="btn__icon">{icon}</span>}
      {text && <span className="btn__text">{text}</span>}
    </button>
  );
}

export default Button;
