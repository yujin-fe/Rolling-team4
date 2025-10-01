/*
    <Button
      icon={icon}            // 있다면 icon 이미지 임포트해서 쓰기
      variant="primary"      // primary / secondary / outlined  
      size="full"            // full / lg / wd / md / sm
      onClick={}             // onClick 함수 
      disabled={isDisabled}  // disabled 조건 함수
    >
      생성하기
    </Button>
*/

import "../assets/css/_style.scss";

function Button({ variant = "primary", size, icon, children, ...props }) {
  const classNames = ["btn", variant, size, icon ? "has-icon" : ""].join(" ");

  return (
    <button className={classNames} {...props}>
      {icon && <img src={icon} alt="" className="has-icon" />}
      {children}
    </button>
  );
}

export default Button;
