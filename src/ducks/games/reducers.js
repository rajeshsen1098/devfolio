import types from "./types";

const gamesReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_GAMES_LIST:
      return [...action.payload];
    case types.GAME_LIST_SORT:
      return [...action.payload];
    case types.GAME_CREATE:
      return [...state, action.payload];
    case types.GAME_ROUND:
      return [
        ...state.map((game) =>
          game.id !== action.payload.id ? game : action.payload
        ),
      ];
    case types.GAME_DELETE:
      return [...state.filter((el) => el.id !== action.payload.id)];
    default:
      return state;
  }
};

export default gamesReducer;
