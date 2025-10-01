import "./Dropdown.scss";
import { useState } from "react";

import btn_arrow from "./../assets/imgs/btn_arrow.svg";
import btn_arrow_gray from "./../assets/imgs/btn_arrow_gray.svg";

const Dropdown = ({ title, data, handleSelectChange, value }) => {
  const [isOpened, setIsOpend] = useState(false);
  const isFinished = !!value && !isOpened;

  const onClickTitle = () => {
    setIsOpend(!isOpened);
  };

  const onClickItem = (e) => {
    handleSelectChange(e.target.innerText);
    setIsOpend(!isOpened);
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
        onClick={onClickTitle}
        className={`title-wrapper 
          ${!isOpened ? "closed-btn" : ""}
          ${isFinished ? "selected-btn" : ""}`}
      >
        <div className={`title txt-16 ${isFinished ? "selected-title" : ""}`}>
          {/* title은, 기본으로 보여지는 화면에 필요한 문구. */}
          {isFinished ? value : title}
        </div>
        {arrowIcon}
      </button>

      {isOpened && (
        <ul className="list">
          {data.map((item) => (
            <li key={item.id}>
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

// 사용하는 쪽 예시
// data = [
//   {
//     id:1,
//     content:'예시'
//   },...
// ]
// const [selectedOpt, setSelectedOpt] = useState('')

// const handleSelectChange = (input) => {
//   setSelectedOption(input)
// }

// <Dropdown
//   title="공유 방법 선택" -> 선택전 기본적으로 보여지는 부분
//   data={data} -> 선택될 리스트들이 담겨진 데이터
//   handleSelectChange={handleSelectChange} -> 상태를 변경하는 함수, 선택된 값이 아규먼트로 전달됨
//   value={selectedOpt} -> 선택된 상태, 선택이 끝난 후 드롭다운 박스에 표시됨
// />
//
