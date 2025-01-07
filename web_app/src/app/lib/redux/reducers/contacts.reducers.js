import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  item: {},
  items: [],
  success: false,
  error: ""
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    // Send contact
    requestSendContact: (state) => {
      state.loading = true;
    },
    successSendContact: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    failureSendContact: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetSuccess: (state) => {
        state.loading = false;
        state.success = false;
      },
  },
});

export const {
  requestSendContact,
  successSendContact,
  failureSendContact,
  resetSuccess
} = contactSlice.actions;
export const contactReducer = contactSlice.reducer;
