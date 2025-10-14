import "./Home.scss";
import { Link } from "react-router-dom";

import home_image1 from "../assets/imgs/home_image1.svg";
import home_image2 from "../assets/imgs/home_image2.svg";
import home_image3 from "../assets/imgs/home_image3.svg";
import home_image4 from "../assets/imgs/home_image4.svg";
import Button from "../components/Button";

const Home = () => {
  return (
    <div className="home">
      <section className="point point_first">
        <div className="point_text">
          <div className="point_text_01 txt-14-b">Point. 01</div>
          <div className="point_text_02 txt-24-b">
            누구나 손쉽게, 온라인 <br className="only_pc" /> 롤링 페이퍼를 만들
            수 있어요
          </div>
          <div className="point_text_03 txt-18">
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
          <div className="point_text_01 txt-14-b">Point. 02</div>
          <div className="point_text_02 txt-24-b">
            서로에게 이모지로 감정을
            <br className="only_pc" /> 표현하세요
          </div>
          <div className="point_text_03 txt-18">
            롤링 페이퍼에 이모지를 추가할 수 있어요.
          </div>
        </div>
      </section>
      <Link to="/list">
        <Button className="home_btn btn primary lg txt-18-b">구경해보기</Button>
      </Link>
    </div>
  );
};

export default Home;
