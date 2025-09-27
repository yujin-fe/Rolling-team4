import "./Toggle.css"
import {useState} from 'react'

const Toggle = ({leftText,rightText}) => {
  const [active, setActive] = useState("left")

  const onChangeToggle = (value) => {
    setActive(value)
  }

  return (
    <div className="Toggle">
      <button
        className={`Toggle_btn ${active === "left" ? "active" : ""}`}
        onClick={() => onChangeToggle("left")}
      >
        {leftText}
      </button>
      <button
        className={`Toggle_btn ${active === "right" ? "active" : ""}`}
        onClick={() => onChangeToggle("right")}
      >
        {rightText}
      </button>
    </div>
  )
}

export default Toggle;