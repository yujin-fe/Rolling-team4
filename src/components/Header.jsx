import "./Header.scss";
import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/imgs/logo.png";

import Button from "./Button";

const Header = () => {
  return (
    <div className="header_area">
      <div>
        <Link to="/">
          <img src={logo} alt="로고" />
        </Link>
      </div>
      <Link to="/post">
        <Button className="header_btn btn outlined wd txt-16-b">
          롤링 페이퍼 만들기
        </Button>
      </Link>
    </div>
  );
};

export default Header;
