import { userConstants } from "../constants/users.constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  authenticathed: false,
  item: {},
  items: [],
  error: "",
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Login
    requestLogin: (state = initialState, action) => {
      action.type = userConstants.LOGIN_USER_REQUEST;
      state.loading = true;
    },
    successLogin: (state = initialState, action) => {
      action.type = userConstants.LOGIN_USER_SUCCESS;
      state.loading = false;
      state.authenticathed = true;
      state.item = action.payload;
    },
    failureLogin: (state = initialState, action) => {
      action.type = userConstants.LOGIN_USER_FAILURE;
      state.loading = false;
      state.error = action.payload;
    },
    // Get ALL
    requestGetAll: (state = initialState, action) => {
      action.type = userConstants.GETALL_USER_REQUEST;
      state.loading = true;
    },
    successGetAll: (state = initialState, action) => {
      action.type = userConstants.GETALL_USER_SUCCESS;
      state.loading = false;
      state.items = action.payload;
    },
    failureGetAll: (state = initialState, action) => {
      action.type = userConstants.GETALL_USER_FAILURE;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  requestLogin,
  successLogin,
  failureLogin,
  requestGetAll,
  successGetAll,
  failureGetAll,
} = usersSlice.actions;
export const userReducer = usersSlice.reducer;
