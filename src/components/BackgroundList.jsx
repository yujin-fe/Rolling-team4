import React, { useState } from "react";

const ImageItem = ({ img, selected, onSelect }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`item img ${selected === img && loaded ? "active" : ""}`}
      style={{ backgroundImage: loaded ? `url(${img})` : "none" }}
      onClick={() => onSelect(img)}
    >
      {!loaded && <div className="loading">로딩중...</div>}

      <img
        src={img}
        alt=""
        style={{ display: "none" }}
        onLoad={() => setLoaded(true)}
      />
      {selected === img && loaded && <span className="check"></span>}
    </div>
  );
};

const BackgroundList = ({
  tab,
  selected,
  onSelect,
  colorsList,
  imageList,
  onUpload,
  uploadedUrl = { uploadedUrl },
}) => {
  return (
    <div className="background-list">
      {tab === "color" &&
        colorsList.map((color) => (
          <div
            key={color}
            className={`item ${selected === color ? "active" : ""}`}
            style={{ background: `var(--${color}-200)` }}
            onClick={() => onSelect(color)}
          >
            {selected === color && <span className="check"></span>}
          </div>
        ))}

      {tab === "image" && (
        <>
          {/* API에서 이미지는3개만 나옴 */}
          {imageList.map((img) => (
            <ImageItem
              key={img}
              img={img}
              selected={selected}
              onSelect={onSelect}
            />
          ))}

          {/* 4번째는 업로드용으로 전환 */}
          <div
            className={`item upload-item ${selected === uploadedUrl ? "active" : ""}`}
            style={{
              backgroundImage: uploadedUrl ? `url(${uploadedUrl})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => {
              if (uploadedUrl) {
                // 클릭 시 선택 가능
                onSelect(uploadedUrl);
              } else {
                // 업로드 전이면 파일선택
                onUpload();
              }
            }}
          >
            {!uploadedUrl ? (
              <span className="plus"></span>
            ) : (
              <button
                className="edit-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpload();
                }}
              >
                수정
              </button>
            )}
            {selected === uploadedUrl && <span className="check"></span>}
          </div>
        </>
      )}
    </div>
  );
};

export default BackgroundList;
