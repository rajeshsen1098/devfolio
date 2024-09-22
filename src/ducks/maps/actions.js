import types from "./types";
import axios from "../../axios";

export const getMapsListAction = (maps) => ({
  type: types.GET_MAPS_LIST,
  payload: maps,
});

export const filterMapsListAction = (maps) => ({
  type: types.MAP_LIST_FILTER,
  payload: maps,
});

export const createMapAction = (map) => ({
  type: types.MAP_CREATE,
  payload: map,
});

export const editMapAction = (map) => ({
  type: types.MAP_EDIT,
  payload: map,
});

export const deleteMapAction = (map) => ({
  type: types.MAP_DELETE,
  payload: map,
});

export const sortMapsListAction = (maps) => ({
  type: types.MAP_LIST_SORT,
  payload: maps,
});

export const getMapsList = () => {
  return async (dispatch) => {
    const response = await axios.get("https://mongodb-api.onrender.com/maps/");
    // const response = await axios.get("http://localhost:4000/maps/");
    const maps = response.data;
    dispatch(getMapsListAction(maps));
  };
};

export const createMap = (map) => {
  return async (dispatch) => {
    axios({
      method: "post",
      url: "https://mongodb-api.onrender.com/maps/",
      data: map,
    })
      .then((response) => {
        dispatch(createMapAction(response.data));
      })
      .catch((error) => console.log(error));
  };
};

export const editMap = (map) => {
  return async (dispatch) => {
    axios({
      method: "put",
      url: `https://mongodb-api.onrender.com/maps/63ac4dbeebd3b4bac09a8979`,
      data: map,
    })
      .then((response) => {
        dispatch(editMapAction(response.data));
      })
      .catch((error) => console.log(error));
  };
};

export const deleteMap = (map) => {
  console.log(map);
  return async (dispatch) => {
    const response = await axios.delete(
      `https://mongodb-api.onrender.com/maps/63ac4dbeebd3b4bac09a8979`
    );
    const mapToDelete = response.data;
    dispatch(deleteMapAction(mapToDelete));
  };
};
