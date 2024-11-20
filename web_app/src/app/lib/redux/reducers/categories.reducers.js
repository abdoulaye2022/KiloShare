import { createSlice } from "@reduxjs/toolkit";
import { categoryConstants } from "../constants/categories.constants";

const initialState = {
  loading: false,
  item: {},
  items: [],
  error: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    // Get ALL
    requestGetAll: (state = initialState, action) => {
      action.type = categoryConstants.GETALL_CATEGORIES_REQUEST;
      state.loading = true;
    },
    successGetAll: (state = initialState, action) => {
      action.type = categoryConstants.GETALL_CATEGORIES_SUCCESS;
      state.loading = false;
      state.items = action.payload;
    },
    failureGetAll: (state = initialState, action) => {
      action.type = categoryConstants.GETALL_CATEGORIES_FAILURE;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  requestGetAll,
  successGetAll,
  failureGetAll
} = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
