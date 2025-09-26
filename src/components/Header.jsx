import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/imgs/logo.png";
import "./Header.scss";

const Header = () => {
  const isActive = true;
  return (
    <div className="header_area">
      <div>
        <Link to="/">
          <img src={logo} alt="로고" />
        </Link>
      </div>
      <Link to="/post">
        <button className={`logo_btn txt-16-b ${isActive ? "active" : ""}`}>
          롤링 페이퍼 만들기
        </button>
        {/* <Button text={"롤링 페이퍼 만들기"} className={`logo_btn txt-16-b ${isActive ? "active" : ""}`}/>  버튼 수정 예정*/}
      </Link>
    </div>
  );
};

export default Header;
