import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  authenticated: false,
  isEmailConfirm: false,
  isEmailAlreadyConfirm: false,
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
    requestLogin(state) {
      state.loading = true;
      state.error = "";
    },
    successLogin(state, action) {
      state.loading = false;
      state.authenticated = true;
      state.user = action.payload;
      state.error = "";
    },
    failureLogin(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Signin actions
    requestSignin(state) {
      state.loading = true;
      state.error = "";
    },
    successSignin(state, action) {
      state.loading = false;
      state.authenticated = true;
      state.user = action.payload;
      state.error = "";
    },
    failureSignin(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Logout actions
    requestLogOut(state) {
      state.loading = true;
      state.error = "";
    },
    successLogOut(state) {
      state.authenticated = false;
      state.loading = false;
      state.user = {};
      state.error = "";
    },
    failureLogOut(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Get All actions
    requestGetAll(state) {
      state.loading = true;
      state.error = "";
    },
    successGetAll(state, action) {
      state.loading = false;
      state.items = action.payload;
      state.user = state.items.find((item) => item.id === state.user.id);
      state.error = "";
    },
    failureGetAll(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Add user actions
    requestAdd(state) {
      state.loading = true;
      state.error = "";
    },
    successAdd(state, action) {
      state.loading = false;
      state.items = [...state.items, action.payload];
      state.error = "";
    },
    failureAdd(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Get one user action
    requestSetIten(state, action) {
      state.item = state.items.find((item) => item.id === action.payload);
      state.error = "";
    },
    requestResetItem(state) {
      state.item = {};
      state.error = "";
    },

    // Update user
    requestUpdate(state) {
      state.loading = true;
      state.error = "";
    },
    successUpdate(state, action) {
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
      state.loading = false;
      state.error = action.payload;
    },
    // Remove user
    requestRemove(state) {
      state.loading = true;
      state.error = "";
    },
    successRemove(state, action) {
      state.loading = false;
      const index = state.items.findIndex((p) => p.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
      state.error = "";
    },
    failureRemove(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Suspend user
    requestSuspend(state) {
      state.loading = true;
      state.error = "";
    },
    successSuspend(state, action) {
      state.loading = false;
      state.items = [
        ...state.items.map((p) => {
          if (p.id === action.payload) {
            p.status = 0;
          }
          return p;
        }),
      ];
      state.error = "";
    },
    failureSuspend(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Unsuspend user
    requestUnsuspend(state) {
      state.loading = true;
      state.error = "";
    },
    successUnsuspend(state, action) {
      state.loading = false;
      state.items = [
        ...state.items.map((p) => {
          if (p.id === action.payload) {
            p.status = 1;
          }
          return p;
        }),
      ];
      state.error = "";
    },
    failureUnsuspend(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Is valid JWT
    requestIsValidJwt(state) {
      state.loading = true;
      state.error = "";
    },
    successIsValidJwt(state) {
      state.loading = false;
    },
    failureIsValidJwt(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetError(state) {
      state.loading = false;
      state.error = "";
    },
    // Confoirm email
    requestConfirmEmail(state) {
      state.loading = true;
      state.error = "";
    },
    successConfirmEmail(state, action) {
      state.loading = false;
      if(action.payload) {
        state.isEmailConfirm = true;
        state.isEmailAlreadyConfirm = false;
      } else {
        state.isEmailAlreadyConfirm = true;
        state.isEmailConfirm = false;
      }
    },
    failureConfirmEmail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Update user profil
    requestUpdateUserProfil: (state) => {
      state.loading = true;
    },
    successUpdateUserProfil: (state, action) => {
      state.loading = false;
      state.user = action.payload
      state.error = "";
    },
    failureUpdateUserProfil: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Update user profil
    requestChangePassword: (state) => {
      state.loading = true;
    },
    successChangePassword: (state) => {
      state.loading = false;
      state.error = "";
    },
    failureChangePassword: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Request reset password
    requestRequestResetPassword: (state) => {
      state.loading = true;
    },
    successRequestResetPassword: (state) => {
      state.loading = false;
      state.error = "";
    },
    failureRequestResetPassword: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Request reset password
    requestResetPasswordReducer: (state) => {
      state.loading = true;
    },
    successResetPassword: (state) => {
      state.loading = false;
      state.error = "";
    },
    failureResetPassword: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Obtenir le jwt
    requestgetToken: (state) => {
      state.loading = true;
    },
    successgetToken: (state) => {
      state.loading = false;
    },
    failuregetToken: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
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
  requestSuspend,
  successSuspend,
  failureSuspend,
  requestUnsuspend,
  successUnsuspend,
  failureUnsuspend,
  requestIsValidJwt,
  successIsValidJwt,
  failureIsValidJwt,
  requestSignin,
  successSignin,
  failureSignin,
  resetError,
  requestConfirmEmail,
  successConfirmEmail,
  failureConfirmEmail,
  requestUpdateUserProfil,
  successUpdateUserProfil,
  failureUpdateUserProfil,
  requestChangePassword,
  successChangePassword,
  failureChangePassword,
  requestRequestResetPassword,
  successRequestResetPassword,
  failureRequestResetPassword,
  requestResetPasswordReducer,
  successResetPassword,
  failureResetPassword,
  requestgetToken,
  successgetToken,
  failuregetToken
} = userSlice.actions;

export const userReducer = userSlice.reducer;
