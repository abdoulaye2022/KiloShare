import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  item: {},
  items: [],
  isFiltered: false,
  filteredItems: [],
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
    // Filtered Ads
    filteredAds: (state, action) => {
      state.isFiltered = true,
      state.filteredItems = [
        ...state.items.filter((p) => {
          if (action.payload.departure_date != "" && action.payload.departure_date != undefined) {
            return p.departure_date === action.payload.departure_date;
          } else {
            return p;
          }
        })
        .filter((p) => {
          if (action.payload.arrival_date != "" && action.payload.arrival_date != undefined) {
            return p.arrival_date === action.payload.arrival_date;
          } else {
            return p;
          }
        })
        .filter((p) => {
          if (action.payload.departure_country != "" && action.payload.departure_country != undefined) {
            return p.departure_country === action.payload.departure_country;
          } else {
            return p;
          }
        })
        .filter((p) => {
          if (action.payload.arrival_country != "" && action.payload.arrival_country != undefined) {
            return p.arrival_country === action.payload.arrival_country;
          } else {
            return p;
          }
        }).filter((p) => {
          if (action.payload.category_id != "" && action.payload.category_id != undefined) {
            return p.category_id === action.payload.category_id;
          } else {
            return p;
          }
        })
      ];
    },
    resetFilter: (state) => {
      state.isFiltered = false,
      state.filteredItems = []
    }
  },
});

export const {
  requestGetAll,
  successGetAll,
  failureGetAll,
  requestAdd,
  successAdd,
  failureAdd,
  filteredAds,
  resetFilter
} = adSlice.actions;

export const adReducer = adSlice.reducer;
