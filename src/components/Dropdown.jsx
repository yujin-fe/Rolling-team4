import "./Dropdown.scss";
import { useState } from "react";

import btn_arrow from "./../assets/imgs/btn_arrow.svg";
import btn_arrow_gray from "./../assets/imgs/btn_arrow_gray.svg";

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
]; //임시데이터

const Dropdown = ({title}) => {
  const [isOpened, setIsOpend] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [option, setOption] = useState("");

  const handleClickTitle = () => {
    setIsOpend(!isOpened);
    if (isFinished) {
      setIsFinished(false);
    }
  };

  const onClickItem = (e) => {
    setOption(e.target.innerText); //클릭된 데이터가 상태값으로 업데이트됨
    setIsOpend(!isOpened);
    setIsFinished(!isFinished);
  };

  const arrowIcon = isFinished ? (
    <img
      className={`title-arrow`}
      src={btn_arrow_gray}
      alt={"드롭다운 방향키"}
    />
  ) : (
    <img
      className={`title-arrow`}
      src={btn_arrow}
      alt={"드롭다운 방향키"}
      style={{ transform: isOpened ? "rotate(0deg)" : "rotate(180deg)" }}
    />
  );

  return (
    <div className={`Dropdown`}>
      <button
        onClick={handleClickTitle}
        className={`title-wrapper 
          ${!isOpened ? "closed-btn" : ""}
          ${isFinished ? "selected-btn" : ""}`}
      >
        <div className={`title txt-16 ${isFinished ? "selected-title" : ""}`}>
          {/* title은 임시프롭스, 기본으로 보여지는 화면에 필요한 문구. */}
          {isFinished ? option : title} 
        </div>
        {arrowIcon}
      </button>

      {!isOpened ? (
        ""
      ) : (
        <ul className="list">
          {data.map((item) => (
            <li key={item.order}>
              <button className="list-item txt-16" onClick={onClickItem}>
                {item.content}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
