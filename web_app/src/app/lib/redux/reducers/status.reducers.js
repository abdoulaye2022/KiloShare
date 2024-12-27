import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  item: {},
  items: [],
  lastFetchedStatusTime: null,
  error: "",
};

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    // Get ALL
    requestGetAll: (state) => {
      state.loading = true;
    },
    successGetAll: (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.lastFetchedStatusTime = Date.now();
    },
    failureGetAll: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  requestGetAll,
  successGetAll,
  failureGetAll,
} = statusSlice.actions;
export const statusReducer = statusSlice.reducer;
