import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { users: [], loading: true };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    allUsersRequest(state) {
      state.loading = true;
      state.users = [];
    },
    allUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload.users;
      state.usersCount = action.payload.usersCount;
    },
    allUsersFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

const userActions = userSlice.actions;

const getAllUsers = () => async (dispatch) => {
  dispatch(userActions.allUsersRequest());
  try {
    const response = await axios.get("https://reqres.in/api/users");
    const totalPages = response.data.total_pages;
    let users = [];
    for (let page = 1; page <= totalPages; page++) {
      const { data } = await axios.get(
        `https://reqres.in/api/users?page=${page}`
      );
      users.push(...data.data);
    }
    dispatch(userActions.allUsersSuccess({ users, usersCount: users.length }));
  } catch (error) {
    dispatch(userActions.allUsersFail(error));
  }
};

export { userActions, getAllUsers };
export default userSlice;
