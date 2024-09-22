import types from "./types";

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_USERS_LIST:
      return [...action.payload];
    case types.USER_LIST_SORT:
      return [...action.payload];
    case types.USER_CREATE:
      return [...state, action.payload];
    case types.USER_EDIT:
      return [
        ...state.map((user) =>
          user.id !== action.payload.id ? user : action.payload
        ),
      ];
    case types.USER_DELETE:
      return [...state.filter((el) => el.id !== action.payload.id)];
    default:
      return state;
  }
};

export default usersReducer;
