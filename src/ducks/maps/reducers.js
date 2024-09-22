import types from "./types";

const mapsReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_MAPS_LIST:
      return [...action.payload];
    case types.MAP_LIST_SORT:
      return [...action.payload];
    case types.MAP_CREATE:
      return [...state, action.payload];
    case types.MAP_EDIT:
      return [
        ...state.map((map) =>
          map.id !== action.payload.id ? map : action.payload
        ),
      ];
    case types.MAP_DELETE:
      return [...state.filter((el) => el.id !== action.payload.id)];
    default:
      return state;
  }
};

export default mapsReducer;
