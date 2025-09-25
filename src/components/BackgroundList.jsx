import React from "react";

const BackgroundList = ({ tab, selected, onSelect, colorsList, imageList }) => {
  return (
    <div className="background-list">
      {tab === "color" &&
        colorsList.map((color) => (
          <div
            key={color}
            className={`item ${selected === color ? "active" : ""}`}
            style={{ background: `var(${color})` }}
            onClick={() => onSelect(color)}
          >
            {selected === color && <span className="check"></span>}
          </div>
        ))}

      {tab === "image" &&
        imageList.map((img) => (
          <div
            key={img}
            className={`item img ${selected === img ? "active" : ""}`}
            style={{
              backgroundImage: `url(${img})`,
            }}
            onClick={() => onSelect(img)}
          >
            {selected === img && <span className="check"></span>}
          </div>
        ))}
    </div>
  );
};

export default BackgroundList;
