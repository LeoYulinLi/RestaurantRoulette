import React from "react";
import "./geo.scss";

function Geo({ closeModal }) {
  return (
    <div className="geo-container">
      <div className="geo-close-modal-button-box">
        <button className="close-button" onClick={closeModal}>
          X
        </button>
      </div>

      <div>This site have been blocked from </div>
      <div>tracking your location on this page </div>
    </div>
  );
}

export default Geo;