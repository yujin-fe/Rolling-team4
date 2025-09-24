import React from "react";
import { useEffect, useState } from "react";
import BackgroundList from "./BackgroundList";
import bg1 from "@/assets/imgs/bg1.jpg";
import bg2 from "@/assets/imgs/bg2.jpg";
import bg3 from "@/assets/imgs/bg3.jpg";
import bg4 from "@/assets/imgs/bg4.jpg";

const colorsList = ["--beige-200", "--purple-200", "--blue-200", "--green-200"];
const imageList = [bg1, bg2, bg3, bg4];

const BackgroundSelect = () => {
  const [tab, setTab] = useState("color");
  const [background, setBackground] = useState("--beige-200");

  useEffect(() => {
    if (tab === "color") {
      setBackground(colorsList[0]);
    } else {
      setBackground(imageList[0]);
    }
  }, [tab]);

  const handleGenerate = () => {
    console.log("선택된 배경:", background);
  };

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
        imageList={imageList}
      />

      <button type="button" className="btn-generate" onClick={handleGenerate}>
        생성하기
      </button>
    </div>
  );
};

export default BackgroundSelect;
