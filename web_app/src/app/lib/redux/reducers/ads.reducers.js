import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  item: {},
  items: [],
  isFiltered: false,
  filteredItems: [],
  lastFetchedAdTime: null,
  error: "",
};

export const adSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    // ADD
    requestAdd: (state) => {
      state.loading = true;
    },
    successAdd: (state, action) => {
      state.loading = false;
      state.items.push(action.payload);
    },
    failureAdd: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // GETALL
    requestGetAll: (state) => {
      state.loading = true;
    },
    successGetAll: (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.lastFetchedAdTime = Date.now();
    },
    failureGetAll: (state, action) => {
      state.loading = false;
      state.error = action.payload;
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
    },
    selectedAd: (state, action) => {
      state.item = state.items.find((item) => item.id === action.payload);
    },
    // Reject
    requestReject: (state) => {
      state.loading = true;
    },
    successReject: (state, action) => {
      state.loading = false;
      state.items = [
        ...state.items.map((p) => {
          if (p.id === action.payload.id) {
            p = action.payload;
          }
          return p;
        }),
      ];
    },
    failureReject: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Approve
    requestApprove: (state) => {
      state.loading = true;
    },
    successApprove: (state, action) => {
      state.loading = false;
      state.items = [
        ...state.items.map((p) => {
          if (p.id === action.payload.id) {
            p = action.payload;
          }
          return p;
        }),
      ];
    },
    failureApprove: (state, action) => {
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
  filteredAds,
  resetFilter,
  selectedAd,
  requestReject,
  successReject,
  failureReject,
  requestApprove,
  successApprove,
  failureApprove
} = adSlice.actions;

export const adReducer = adSlice.reducer;
