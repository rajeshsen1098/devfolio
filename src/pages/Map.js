import React from "react";
import { GoogleMap, StreetViewPanorama } from "@react-google-maps/api";

function Map() {
  const containerStyle = {
    height: "400px",
    width: "800px",
  };

  const center = {
    lat: 54.364442,
    lng: 18.643173,
  };
  const panorama = document.querySelector(".panorama-container").childNodes[0];
  panorama.style.width = "100%";
  panorama.style.height = "100vh";
  return (
    <div className="panorama-container">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <StreetViewPanorama
          id="street-view"
          mapContainerStyle={containerStyle}
          position={center}
          visible={true}
        />
      </GoogleMap>
    </div>
  );
}

export default Map;
