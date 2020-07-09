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

      <div className='geo-box'>
        <div>This site have been blocked from</div>
        <div>tracking your location on this page </div>
        <br/>
        <div className="geo-box-text">Enable Geolocation in order to access</div>
      </div>
    </div>
  );
}

export default Geo;