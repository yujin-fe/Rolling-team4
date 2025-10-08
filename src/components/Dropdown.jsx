import "./Dropdown.scss";
import { useState } from "react";

import btn_arrow from "./../assets/icons/btn_arrow.svg";
import Button from "./Button"

const Dropdown = ({ title, data, handleSelectChange, value, titleSize, icon, ...btn }) => {
  const [isOpened, setIsOpend] = useState(false);

  const onClickTitle = () => {
    setIsOpend(!isOpened);
  };

  const onClickItem = (e) => {
    handleSelectChange(e.target.innerText);
    setIsOpend(!isOpened);
  };

  return (
    <div className={`Dropdown ${titleSize}`}>
      {icon?(<Button 
        icon={icon} 
        {...btn} 
        onClick={(e)=> {
          onClickTitle()
          e.currentTarget.blur();
        }}/>):(<button
        onClick={onClickTitle}
        className={`title-wrapper ${isOpened ? "" : "closed-btn"}`}
      >
        <div className={`title txt-16 ${isOpened ? "" : "closed-title"}`}>
          {/* title은, 기본으로 보여지는 화면에 필요한 문구. */}
          {value || title}
        </div>
        <img
          className={`title-arrow`}
          src={btn_arrow}
          alt={"드롭다운 방향키"}
          style={{ transform: isOpened ? "rotate(0deg)" : "rotate(180deg)" }}
        />
      </button>)}
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

//오류처리
//열렸는데 밸류가 없고 닫히면 오류
