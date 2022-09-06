import React from "react";

const OddsButton = ({ content, selected, upDown }) => {
  return (
    <button
      data-btn-selected={`${selected}`}
      data-btn-increase={`${upDown === "u"}`}
      data-btn-decrease={`${upDown === "d"}`}
      className="btn"
    >
      <i
        style={!upDown ? { display: "none" } : {}}
        className={`fa-solid fa-caret-${upDown === "u" ? "up" : "down"}`}
      ></i>
      {content}
    </button>
  );
};

export default OddsButton;
