import React, { useRef } from "react";

const BackgroundList = ({
  tab,
  selected,
  onSelect,
  colorsList,
  imageList,
  uploadedImg,
  onUpload,
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      onUpload(previewURL);
    }
  };

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
          {imageList.slice(0, 3).map((img) => (
            <div
              key={img}
              className={`item img ${selected === img ? "active" : ""}`}
              style={{ backgroundImage: `url(${img})` }}
              onClick={() => onSelect(img)}
            >
              {selected === img && <span className="check"></span>}
            </div>
          ))}

          {uploadedImg ? (
            <div
              className={`item img upload ${selected === uploadedImg ? "active" : ""}`}
              style={{ backgroundImage: `url(${uploadedImg})` }}
              onClick={() => onSelect(uploadedImg)}
            >
              {selected === uploadedImg && <span className="check"></span>}

              <button
                type="button"
                className="replace-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current.click();
                }}
              >
                ✎
              </button>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div
              className="item img upload"
              onClick={() => fileInputRef.current.click()}
            >
              <span className="plus">
                <span className="blind">등록하기</span>
              </span>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BackgroundList;
