import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getMapsList } from "../ducks/maps/actions";
import UpgradeBar from "../components/UpgradeBar";
import NavbarAccount from "../components/NavbarAccount";
import poland from "../media/poland-map.jpg";
import pomerania from "../media/pomerania-map.jpg";
import "../styles/MapsList.scss";
import numeral from "numeral";

const MapsList = ({ maps }) => {
  let { state } = useLocation();
  return (
    <div className="maps-container">
      <div className="maps-main-view">
        <UpgradeBar />
        <div className="maps-nav-bar">
          <header>
            <div className="logo">
              <a title="GeoGuessr" href="/">
                <img
                  src="https://www.geoguessr.com/_next/static/images/logo-e108dab37292e7fec6148eb5f19bf484.svg"
                  alt="GeoGuessr"
                />
              </a>
            </div>
            <div></div>
            <NavbarAccount user={state.user} />
          </header>
        </div>
        <div className="maps-main">
          <div className="maps-grid">
            {maps.length !== 0 ? (
              maps.map((el) => (
                <Link
                  key={el._id}
                  to={el._id}
                  state={{ user: state.user }}
                  style={{ textDecoration: "none", cursor: "auto" }}
                >
                  <div className="map" id='63ac4dbeebd3b4bac09a8979'>
                    <img
                      alt="map-img"
                      
                      // {el.name==1}
                      src={el.name == "Tricity areas" ? pomerania : poland}
                    ></img>
                    <div>{el.name}</div>
                    <button>PLAY</button>
                    {/* <div>{el.description}</div> */}
                    {/* <div>{el.likes} likes</div> */}
                    {/* <div className="map-details">
                      {numeral(el.locationsList.length).format("0.0a")}{" "}
                      locations
                    </div> */}
                  </div>
                </Link>
              ))
            ) : (
              <div>MAPS LOADING... (can take up to 30 seconds)</div>
            )}
          </div>
        </div>
        <div className="maps-side-bar">
          <div className="side-bar-content"></div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    maps: state.maps,
  };
};

const mapDispatchToProps = {
  getMapsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapsList);
