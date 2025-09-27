import { useEffect, useState } from "react";
import axios from "@/api/axios";
import BackgroundList from "./BackgroundList";

const colorsList = ["beige", "purple", "blue", "green"];

const BackgroundSelect = ({ tab, setTab, background, setBackground }) => {
  const [backgroundImg, setBackgroundImg] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/background-images/");
        setBackgroundImg(data.imageUrls);
      } catch (err) {
        console.error("fetch error", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (tab === "color") {
      setBackground(colorsList[0]);
    } else if (backgroundImg.length > 0) {
      setBackground(backgroundImg[0]);
    }
  }, [tab, backgroundImg]);

  return (
    <div className="background-select">
      <p className="tit txt-24-b">배경화면을 선택해 주세요.</p>
      <p className="txt txt-16 mg-t04">
        컬러를 선택하거나, 이미지를 선택할 수 있습니다.
      </p>

      <nav className="tab">
        <button
          type="button"
          className={`tab-btn ${tab === "color" ? "active" : ""}`}
          onClick={() => setTab("color")}
        >
          컬러
        </button>
        <button
          type="button"
          className={`tab-btn ${tab === "image" ? "active" : ""}`}
          onClick={() => setTab("image")}
        >
          이미지
        </button>
      </nav>

      <BackgroundList
        tab={tab}
        selected={background}
        onSelect={setBackground}
        colorsList={colorsList}
        imageList={backgroundImg}
      />
    </div>
  );
};

export default BackgroundSelect;
