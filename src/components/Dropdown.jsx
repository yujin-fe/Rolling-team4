import "./Dropdown.css";
import { useState } from "react";
import btn_arrow from "./../assets/btn_arrow.svg"

const data = [
  {
    order: 1,
    content: "카카오톡 공유",
  },
  {
    order: 2,
    content: "인스타그램 공유",
  },
  {
    order: 3,
    content: "페이스북 공유",
  },
];

const Dropdown = () => {
  const [isOpened, setIsOpend] = useState(false);
  
  const handleClick = () => {
    setIsOpend(!isOpened)
  }

  return (
    <div className="Dropdown">
      <div className="btn-wrapper">
        <button onClick={handleClick} className="button">title</button>
        <img 
          className="btn_arrow" 
          src={btn_arrow} 
          alt={"드롭다운 방향키"} 
          style={
            (isOpened)
              ?{transform:"rotate(0deg)"}
              :{transform:"rotate(180deg)"}
          }/>
      </div>

      {!isOpened ? (
        ""
      ) : (
        <ul className="list">
          {data.map((item) => (
            <li key={item.order}><button className="list-item">{item.content}</button></li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
