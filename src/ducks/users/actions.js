import types from "./types";
import axios from "axios";
console.log();

export const getUsersListAction = (users) => ({
  type: types.GET_USERS_LIST,
  payload: users,
});

export const filterUsersListAction = (users) => ({
  type: types.USER_LIST_FILTER,
  payload: users,
});

export const createUserAction = (user) => ({
  type: types.USER_CREATE,
  payload: user,
});

export const editUserAction = (user) => ({
  type: types.USER_EDIT,
  payload: user,
});

export const deleteUserAction = (user) => ({
  type: types.USER_DELETE,
  payload: user,
});

export const sortUsersListAction = (users) => ({
  type: types.USER_LIST_SORT,
  payload: users,
});

export const getUsersList = () => {
  return async (dispatch) => {
    const response = await axios.get("https://mongodb-api.onrender.com/users");
    const users = response.data;
    console.log(users);
    dispatch(getUsersListAction(users));
  };
};

export const createUser = (user) => {
  return async (dispatch) => {
    axios({
      method: "post",
      url: "https://mongodb-api.onrender.com/users/register",
      data: user,
    })
      .then((response) => {
        dispatch(createUserAction(response.data));
      })
      .catch((error) => console.log(error));
  };
};

export const editUser = (user) => {
  console.log(user);
  return async (dispatch) => {
    axios({
      method: "put",
      url: `https://mongodb-api.onrender.com/users/${user.id}`,
      data: user,
    })
      .then((response) => {
        dispatch(editUserAction(response.data));
      })
      .catch((error) => console.log(error));
  };
};

export const deleteUser = (user) => {
  console.log(user);
  return async (dispatch) => {
    const response = await axios.delete(
      `https://mongodb-api.onrender.com/users/${user.id}`
    );
    const userToDelete = response.data;
    dispatch(deleteUserAction(userToDelete));
  };
};
