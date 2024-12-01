import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  item: {},
  items: [],
  error: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // Get ALL
    requestGetAll: (state) => {
      state.loading = true;
    },
    successGetAll: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    failureGetAll: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // ADD
    requestAdd: (state) => {
      state.loading = true;
    },
    successAdd: (state, action) => {
      state.loading = false;
      state.items = [...state.items, action.payload];
    },
    failureAdd: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  requestGetAll,
  successGetAll,
  failureGetAll,
  requestAdd,
  successAdd,
  failureAdd,
} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
