import "./Button.scss";
import React from "react";

function Button({ variant = "primary", size, icon, children, ...props }) {
  const classNames = ["btn", variant, size, icon ? "with-icon" : ""].join(" ");

  return (
    <button className={classNames} {...props}>
      {icon && <img src={icon} alt="" className="btn-icon" />}
      {children}
    </button>
  );
}

export default Button;
