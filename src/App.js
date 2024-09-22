import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import MapRoutes from "./components/MapRoutes";
import GameRoutes from "./components/GameRoutes";
import SignUp from "./pages/SignUp";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUsersList } from "./ducks/users/actions";
import { getMapsList } from "./ducks/maps/actions";
import { getGamesList } from "./ducks/games/actions";
import LogIn from "./pages/LogIn";
import { useSelector } from "react-redux";
import { getUser } from "./selectors";
import WelcomePage from "./pages/WelcomePage";

function App({ users, maps, getMapsList, games, auth }) {
  const [user, setUser] = useState(null);
  const loggedUser = useSelector(getUser);
  if (!user) {
    if (loggedUser) {
      setUser(loggedUser);
    }
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }
  useEffect(() => {
    if (maps.length === 0) {
      getMapsList();
    }
  });

  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
        // element={user ? <Home user={user} /> : <WelcomePage />}
      ></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/login" element={<LogIn />}></Route>
      <Route path="/maps/*" element={<MapRoutes />}></Route>
      <Route path="/game/*" element={<GameRoutes />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}
const mapStateToProps = (state, props) => {
  return {
    users: state.users,
    maps: state.maps,
    games: state.games,
    auth: state.auth,
  };
};

const mapDispatchToProps = {
  getUsersList,
  getMapsList,
  getGamesList,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
