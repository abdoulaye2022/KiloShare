import { createSlice } from "@reduxjs/toolkit";
import { modalConstants } from "../constants/modals.contants";

const initialState = {
  isOpenUserForm: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // Get ALL
    requestOpenUserForm: (state = initialState, action) => {
      action.type = modalConstants.OPEN_USER_FORM_MODAL;
      state.isOpenUserForm = true;
    },
    requestCloseUserForm: (state = initialState, action) => {
      action.type = modalConstants.CLOSE_USER_FORM_MODAL;
      state.isOpenUserForm = false;
    },
  },
});

export const { requestOpenUserForm, requestCloseUserForm } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
