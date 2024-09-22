import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createGameAction } from "../ducks/games/actions";
import { getMapsList } from "../ducks/maps/actions";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "../styles/MapDetails.scss";
import NavbarAccount from "../components/NavbarAccount";
import UpgradeBar from "../components/UpgradeBar";
import ClipLoader from "react-spinners/ClipLoader";

const MapDetails = ({ maps, createGameAction }) => {
  const [gameID, setGameID] = useState(uuidv4());
  const [loadingOverlay, setLoadingOverlay] = useState(false);
  let { state } = useLocation();
  useEffect(() => {
    if (maps.length === 0) {
      setGameID(uuidv4());
    }
    window.addEventListener("popstate", () => {
      window.location.reload();
    });
  }, []);

  const { id } = useParams();
  const map = maps.filter((map) => map._id === id)[0];
  const [move, setMove] = useState(true);
  // const [pan, setPan] = useState(true);
  // const [zoom, setZoom] = useState(true);

  const createNewGame = async () => {
    const random = map.locationsList
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    const game = {
      gameId: gameID,
      time: 0,
      player: "639c73bbb0ef36ed25560b5d",
      mapId: id,
      move: move,
      pan: true,
      zoom: true,
      locations: random,
      currentRound: 1,
      roundsList: [],
      timesList: [],
      country: map?.country,
      zoomLevel: map?.zoomLevel,
      exponent: map?.exponent,
    };
    setLoadingOverlay(true);
    axios({
      method: "post",
      url: "https://mongodb-api.onrender.com/games",
      data: game,
    })
      .then((response) => {
        createGameAction(response.data);
        setLoadingOverlay(false);
        const start = document.getElementById("start");
        start.click();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="details-container">
      <div className="details-main-view">
        <UpgradeBar />
        <div className="details-nav-bar">
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
            <NavbarAccount user={state?.user} />
          </header>
        </div>
        <div className="details-main">
          {map && map.locationsList ? (
            <div className="details-info">
              <div className="title">{map.name}</div>
              <div>{map.description}</div>
              <div>{map.locationsList.length} locations</div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
          <div className="menu-options">
            <div className="options">
              {/* <div></div>GAME SETTINGS<div></div> */}
            </div>
            <div className="options-container">
              <div className="switch-col">
                {/* <div>MOVE</div> */}
                {/* <input */}
                  {/* type="checkbox" */}
                  {/* checked={move} */}
                  {/* onChange={() => setMove(!move)} */}
                {/* /> */}
              </div>
              {/* <div className="switch-col">
            <div>PAN</div>
            <input
              type="checkbox"
              checked={pan}
              onChange={() => setPan(!pan)}
            />
          </div>
          <div className="switch-col">
            <div>ZOOM</div>
            <input
              type="checkbox"
              checked={zoom}
              onChange={() => setZoom(!zoom)}
            />
          </div> */}
            </div>
            <button
              id="startGame"
              className="start-game"
              onClick={() => {
                window.location.href = "https://geoguessr-clone.netlify.app/game/a66ea3e7-4893-463a-9c15-464ee7566946";
              }}
            >
              START GAME!
            </button>
            {loadingOverlay ? (
              <div className="loading-spinner">
                <ClipLoader color="#a19bd9" size={75} />
                <div>
                  Please wait, it can take up to 30 seconds 
                </div>
              </div>
            ) : null}
            <Link id="start" to={`../../game/${gameID}`}></Link>
          </div>
        </div>
        <div className="maps-side-bar">
          <div className="side-bar-content"></div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    maps: state.maps,
  };
};

const mapDispatchToProps = {
  createGameAction,
  getMapsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapDetails);
