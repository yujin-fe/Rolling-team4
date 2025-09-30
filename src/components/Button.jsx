/*
    <Button
    variant="primary"     //  primary / secondary / outlined
    size="lg"      //  full / lg / wd / md / sm 
    onClick={}
    disabled={false}   // true / false
    icon={import한 이미지}
    >
    추가하기  
    </Button>
*/

function Button({
  variant = "primary",
  size,
  icon,
  isDisabled,
  children,
  ...props
}) {
  const hasChildren = !!children; // children 존재 여부
  const classNames = [
    "btn",
    variant,
    size,
    icon ? "has-icon" : "", // 아이콘 존재 여부
    !isDisabled ? "no-hover" : "", // isDisabled 상태일 때 no-hover클래스 추가
    !hasChildren && icon ? "icon-only" : "", // 아이콘만 있을 때 스타일
  ].join(" ");

  return (
    <button className={classNames} {...props}>
      {icon && <img src={icon} alt="" className="btn-icon" />}
      {hasChildren && children}
    </button>
  );
}

export default Button;
