import "./Header.scss";
import { Link } from "react-router-dom";

import logo from "../assets/imgs/logo.png";

const Header = ({ hideButton }) => {
  return (
    <header className="header-area">
      <div className="header-content">
        <div>
          <Link to="/">
            <img src={logo} alt="로고" />
          </Link>
        </div>
        {!hideButton && (
          <Link to="/post">
            <button className="header-btn btn outlined wd txt-16-b">
              롤링 페이퍼 만들기
            </button>
            {/* <Button text={"롤링 페이퍼 만들기"} className={`logo_btn txt-16-b ${isActive ? "active" : ""}`}/>  버튼 수정 예정*/}
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
