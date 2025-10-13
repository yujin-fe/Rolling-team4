import { useEffect, useRef, useState } from "react";

import axios from "../api/axios";

import BackgroundList from "./BackgroundList";
import Toggle from "./Toggle";

const CLOUD_NAME = "dsonkljmp";
const UPLOAD_PRESET = "rolling";
const colorsList = ["beige", "purple", "blue", "green"];

const BackgroundSelect = ({ tab, setTab, background, setBackground }) => {
  const [backgroundImg, setBackgroundImg] = useState([]);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/background-images/");
        // api이미지 3개만 사용
        setBackgroundImg(data.imageUrls.slice(0, 3));
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

  /**
   * Cloudinary 이미지 업로드하기
   */
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      //업로드된 이미지 URL 저장
      setUploadedUrl(data.secure_url);
      setBackground(data.secure_url);
    } catch (err) {
      console.error("Cloudinary upload error", err);
    } finally {
      e.target.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="background-select">
      <p className="tit txt-24-b">배경화면을 선택해 주세요.</p>
      <p className="txt txt-16 mg-t04">
        컬러를 선택하거나, 이미지를 선택할 수 있습니다.
      </p>

      <nav className="tab mg-t24">
        <Toggle
          leftText="컬러"
          rightText="이미지"
          value={tab}
          onChange={setTab}
        />
      </nav>

      <BackgroundList
        tab={tab}
        selected={background}
        onSelect={setBackground}
        colorsList={colorsList}
        imageList={backgroundImg}
        onUpload={handleUploadClick}
        uploadedUrl={uploadedUrl}
      />

      {/* 숨겨진 input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default BackgroundSelect;
