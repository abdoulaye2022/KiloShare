import { createSlice } from "@reduxjs/toolkit";
import { menuConstants } from "../constants/menus.constants";

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
      action.type = menuConstants.SELECT_SIDE_BAR_MENU;
      state.key = action.payload.key
      state.breadcrumb = action.payload.breadcrumb
    },
  },
});

export const { requestSelectMenu } = menusSlice.actions;
export const menusReducer = menusSlice.reducer;
