import { createSlice } from "@reduxjs/toolkit";
import { profileConstants } from "../constants/profiles.constants";

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
    requestGetAll: (state = initialState, action) => {
      action.type = profileConstants.GETALL_PROFILES_REQUEST;
      state.loading = true;
    },
    successGetAll: (state = initialState, action) => {
      action.type = profileConstants.GETALL_PROFILES_SUCCESS;
      state.loading = false;
      state.items = action.payload;
    },
    failureGetAll: (state = initialState, action) => {
      action.type = profileConstants.GETALL_PROFILES_FAILURE;
      state.loading = false;
      state.error = action.payload;
    },
    // ADD
    requestAdd: (state = initialState, action) => {
        action.type = profileConstants.ADD_PROFILES_REQUEST;
        state.loading = true;
      },
      successAdd: (state = initialState, action) => {
        action.type = profileConstants.ADD_PROFILES_SUCCESS;
        state.loading = false;
        state.items = [...state.items, action.payload];
      },
      failureAdd: (state = initialState, action) => {
        action.type = profileConstants.ADD_PROFILES_FAILURE;
        state.loading = false;
        state.error = action.payload;
      },
  

  },
});

export const {
  requestGetAll,
  successGetAll,
  failureGetAll,
} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
