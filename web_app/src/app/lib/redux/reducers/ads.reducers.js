import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  item: {},
  items: [],
  error: "",
};

export const adSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    // ADD
    requestAdd: (state) => {
      state.loading = true; // Mise à jour de l'état sans réinitialiser
    },
    successAdd: (state, action) => {
      state.loading = false;
      state.items.push(action.payload); // Ajout de l'annonce à l'état
    },
    failureAdd: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Enregistrement de l'erreur
    },
    // GETALL
    requestGetAll: (state) => {
      state.loading = true; // Mise à jour de l'état sans réinitialiser
    },
    successGetAll: (state, action) => {
      state.loading = false;
      state.items = action.payload; // Mise à jour de la liste des annonces
    },
    failureGetAll: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Enregistrement de l'erreur
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
} = adSlice.actions;

export const adReducer = adSlice.reducer;
