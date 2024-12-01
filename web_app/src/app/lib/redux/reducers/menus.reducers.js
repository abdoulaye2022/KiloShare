import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  key: "1",
  breadcrumb: [{ title: "Dashboard" }]
};

export const menusSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // Get ALL
    requestSelectMenu: (state = initialState, action) => {
      state.key = action.payload.key
      state.breadcrumb = action.payload.breadcrumb
    },
  },
});

export const { requestSelectMenu } = menusSlice.actions;
export const menusReducer = menusSlice.reducer;
