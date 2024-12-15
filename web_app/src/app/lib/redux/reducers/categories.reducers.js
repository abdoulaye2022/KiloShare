import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  item: {},
  items: [],
  lastFetchedCategoryTime: null,
  error: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    // Get ALL
    requestGetAll: (state) => {
      state.loading = true;
    },
    successGetAll: (state, action) => {
      state.loading = false;
        state.items = action.payload;
        state.lastFetchedCategoryTime = Date.now();
    },
    failureGetAll: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { requestGetAll, successGetAll, failureGetAll } =
  categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
