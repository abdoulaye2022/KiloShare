import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  item: {},
  items: [],
  lastFetchedPreferenceTime: null,
  error: null,
};

export const preferenceSlice = createSlice({
  name: "preference",
  initialState,
  reducers: {
    // Get ALL
    requestGetAll: (state) => {
      state.loading = true;
    },
    successGetAll: (state, action) => {
      state.loading = false;
      state.item = action.payload;
      state.lastFetchedPreferenceTime = Date.now();
    },
    failureGetAll: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Add default preference
    requestAddDefault: (state) => {
      state.loading = true;
    },
    successAddDefault: (state, action) => {
      state.loading = false;
      state.item = action.payload;
    },
    failureAddDefault: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Update preference
    requestUpdateDefault: (state) => {
      state.loading = true;
    },
    successUpdateDefault: (state, action) => {
      state.loading = false;
      state.item = action.payload;
    },
    failureUpdateDefault: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  requestGetAll,
  successGetAll,
  failureGetAll,
  requestAddDefault,
  successAddDefault,
  failureAddDefault,
  requestUpdateDefault,
  successUpdateDefault,
  failureUpdateDefault
} = preferenceSlice.actions;
export const preferenceReducer = preferenceSlice.reducer;
