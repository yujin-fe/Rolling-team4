import React from "react";
import { useEffect, useState } from "react";
import axios from "@/api/axios";
import BackgroundList from "./BackgroundList";
import bg1 from "@/assets/imgs/post/bg1.jpg";
import bg2 from "@/assets/imgs/post/bg2.jpg";
import bg3 from "@/assets/imgs/post/bg3.jpg";
import bg4 from "@/assets/imgs/post/bg4.jpg";

const colorsList = ["beige", "purple", "blue", "green"];
const imageList = [bg1, bg2, bg3, bg4];

const BackgroundSelect = () => {
  const [tab, setTab] = useState("color");
  const [background, setBackground] = useState("beige");
  const [uploadedImg, setUploadedImg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/background-images/");
      // const { data } = await axios.get("/4/recipients/");
      console.log("data", data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (tab === "color") {
      setBackground(colorsList[0]);
    } else {
      setBackground(imageList[0]);
    }
  }, [tab]);

  const handleUpload = (previewURL) => {
    setUploadedImg(previewURL); // 업로드된 이미지 저장
    setBackground(previewURL); // 업로드 이미지 선택
  };

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
        uploadedImg={uploadedImg}
        onUpload={handleUpload}
      />

      <button type="button" className="btn-generate" onClick={handleGenerate}>
        생성하기
      </button>
    </div>
  );
};

export default BackgroundSelect;
