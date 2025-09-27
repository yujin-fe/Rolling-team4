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

const BackgroundList = ({ tab, selected, onSelect, colorsList, imageList }) => {
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

      {tab === "image" &&
        imageList.map((img) => (
          <ImageItem
            key={img}
            img={img}
            selected={selected}
            onSelect={onSelect}
          />
        ))}
    </div>
  );
};

export default BackgroundList;
