import "./Home.scss";
import { Link } from "react-router-dom";

import home_image1 from "../assets/imgs/home_image1.png";
import home_image2 from "../assets/imgs/home_image2.png";
import home_image3 from "../assets/imgs/home_image3.png";
import home_image4 from "../assets/imgs/home_image4.png";

const Home = () => {
  const isActive = true;
  return (
    <div className="home">
      <section className="point point_first">
        <div className="point_text">
          <div className={`point_text_01 txt-14-b ${isActive ? "active" : ""}`}>
            Point. 01
          </div>
          <div className={`point_text_02 txt-24-b ${isActive ? "active" : ""}`}>
            누구나 손쉽게, 온라인 <br className="only_pc" /> 롤링 페이퍼를 만들
            수 있어요
          </div>
          <div className={`point_text_03 txt-18 ${isActive ? "active" : ""}`}>
            로그인 없이 자유롭게 만들어요.
          </div>
        </div>
        <div className="point_image">
          <img src={home_image1} alt="롤링페이퍼 카드 이미지 1" />
          <img src={home_image2} alt="롤링페이퍼 카드 이미지 2" />
          <img src={home_image3} alt="롤링페이퍼 카드 이미지 3" />
        </div>
      </section>
      <section className="point point_second">
        <div className="point_image">
          <img src={home_image4} alt="롤링페이터 이모지 이미지" />
        </div>
        <div className="point_text">
          <div className={`point_text_01 txt-14-b ${isActive ? "active" : ""}`}>
            Point. 02
          </div>
          <div className={`point_text_02 txt-24-b ${isActive ? "active" : ""}`}>
            서로에게 이모지로 감정을
            <br className="only_pc" /> 표현하세요
          </div>
          <div className={`point_text_03 txt-18 ${isActive ? "active" : ""}`}>
            롤링 페이퍼에 이모지를 추가할 수 있어요.
          </div>
        </div>
      </section>
      <Link to="/list">
        <button className={`home_btn txt-18-b ${isActive ? "active" : ""}`}>
          구경해보기
        </button>
      </Link>
    </div>
  );
};

export default Home;
