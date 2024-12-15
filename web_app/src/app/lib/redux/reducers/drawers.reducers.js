import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenAdsDrawer: false,
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openOpenAdsDrawer: (state) => {
      state.isOpenAdsDrawer = true;
    },
    closeOpenAdsDrawer: (state) => {
      state.isOpenAdsDrawer = false;
    },
  },
});

// Export des actions générées par createSlice
export const {
    openOpenAdsDrawer,
    closeOpenAdsDrawer,
} = drawerSlice.actions;

// Export du réducteur
export const drawerReducer = drawerSlice.reducer;
