import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  item: {},
  items: [],
  language: "fr",
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
      state.language = action.payload.user_language;
    },
    failureUpdateDefault: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Change language
    requestLanguage: (state) => {
      state.loading = true;
    },
    successLanguage: (state, action) => {
      state.loading = false;
      state.language = action.payload
    },
    failureLanguage: (state, action) => {
      state.loading = false;
      state.error = action.payload
    },
    // Set language
    requestLanguageUser: (state) => {
      state.loading = true;
    },
    successLanguageUser: (state, action) => {
      state.loading = false;
      state.language = action.payload
    },
    failureLanguageUser: (state, action) => {
      state.loading = false;
      state.error = action.payload
    }
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
  failureUpdateDefault,
  requestLanguage,
  successLanguage,
  failureLanguage,
  requestLanguageUser,
  successLanguageUser,
  failureLanguageUser
} = preferenceSlice.actions;
export const preferenceReducer = preferenceSlice.reducer;
