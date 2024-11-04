import { createSlice } from "@reduxjs/toolkit";
import { userConstants } from "../constants/users.constants";

const initialState = {
  loading: false,
  authenticated: false,
  user: {},
  item: {},
  items: [],
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Login actions
    requestLogin(state, action) {
      action.type = userConstants.LOGIN_USER_REQUEST;
      state.loading = true;
      state.error = "";
    },
    successLogin(state, action) {
      action.type = userConstants.LOGIN_USER_SUCCESS;
      state.loading = false;
      state.authenticated = true;
      state.user = action.payload;
      state.error = "";
    },
    failureLogin(state, action) {
      action.type = userConstants.LOGIN_USER_FAILURE;
      state.loading = false;
      state.error = action.payload;
    },

    // Logout actions
    requestLogOut(state, action) {
      action.type = userConstants.LOGOUT_USER_REQUEST;
      state.loading = true;
      state.error = "";
    },
    successLogOut(state, action) {
      action.type = userConstants.LOGOUT_USER_SUCCESS;
      state.authenticated = false;
      state.loading = false;
      state.user = {};
      state.error = "";
    },
    failureLogOut(state, action) {
      action.type = userConstants.LOGOUT_USER_FAILURE;
      state.loading = false;
      state.error = action.payload;
    },

    // Get All actions
    requestGetAll(state, action) {
      action.type = userConstants.GETALL_USER_REQUEST;
      state.loading = true;
      state.error = "";
    },
    successGetAll(state, action) {
      action.type = userConstants.GETALL_USER_SUCCESS;
      state.loading = false;
      state.items = action.payload;
      state.user = state.items.find((item) => item.id === state.user.id);
      state.error = "";
    },
    failureGetAll(state, action) {
      action.type = userConstants.GETALL_USER_FAILURE;
      state.loading = false;
      state.error = action.payload;
    },

    // Add user actions
    requestAdd(state, action) {
      action.type = userConstants.ADD_USER_REQUEST;
      state.loading = true;
      state.error = "";
    },
    successAdd(state, action) {
      action.type = userConstants.ADD_USER_SUCCESS;
      state.loading = false;
      state.items = [...state.items, action.payload];
      state.error = "";
    },
    failureAdd(state, action) {
      action.type = userConstants.ADD_USER_FAILURE;
      state.loading = false;
      state.error = action.payload;
    },

    // Get one user action
    requestSetIten(state, action) {
      action.type = userConstants.SET_ITEM_USER_REQUEST;
      state.item = state.items.find((item) => item.id === action.payload);
      state.error = "";
    },
    requestResetItem(state, action) {
      action.type = userConstants.RESET_ITEM_USER_REQUEST;
      state.item = {};
      state.error = "";
    },

    // Update user
    requestUpdate(state, action) {
      action.type = userConstants.UPDATE_USER_REQUEST;
      state.loading = true;
      state.error = "";
    },
    successUpdate(state, action) {
      action.type = userConstants.UPDATE_USER_SUCCESS;
      state.loading = false;
      state.items = [
        ...state.items.map((p) => {
          if (p.id === action.payload.id) {
            p = action.payload;
          }
          return p;
        }),
      ];
      state.user = state.items.find((item) => item.id === state.user.id);
      state.error = "";
    },
    failureUpdate(state, action) {
      action.type = userConstants.UPDATE_USER_FAILURE;
      state.loading = false;
      state.error = action.payload;
    },
    // Remove user
    requestRemove(state, action) {
      action.type = userConstants.REMOVE_USER_REQUEST;
      state.loading = true;
      state.error = "";
    },
    successRemove(state, action) {
      action.type = userConstants.REMOVE_USER_SUCCESS;
      state.loading = false;
      const index = state.items.findIndex((p) => p.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
      state.error = "";
    },
    failureRemove(state, action) {
      action.type = userConstants.REMOVE_USER_FAILURE;
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
  requestAdd,
  successAdd,
  failureAdd,
  requestGetOne,
  requestLogOut,
  successLogOut,
  failureLogOut,
  requestSetIten,
  requestResetItem,
  requestUpdate,
  successUpdate,
  failureUpdate,
  requestRemove,
  successRemove,
  failureRemove,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
