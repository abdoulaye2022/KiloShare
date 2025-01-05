import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  loading: false,
  item: {},
  items: [],
  userAds: [],
  adminAds: [],
  adMessages: [],
  isFiltered: false,
  filteredItems: [],
  lastFetchedAdTime: null,
  lastFetchedMyAdTime: null,
  messageSent: false,
  page: 1,
  hasMore: true,
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
      state.lastFetchedMyAdTime = Date.now();
      state.userAds.push(action.payload);
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
      state.page += 1;
      state.hasMore = action.payload.length > 0; 
      state.lastFetchedAdTime = Date.now();
    },
    failureGetAll: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // GETALLPAGINATE
    requestGetAllPaginage: (state) => {
      state.loading = true;
    },
    successGetAllPaginate: (state, action) => {
      state.loading = false;
      state.items = [...state.items, ...action.payload];
      state.page += 1;
      state.hasMore = action.payload.length > 0; 
      state.lastFetchedAdTime = Date.now();
    },
    failureGetAllPaginate: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // GETONE
    requestGetOne: (state) => {
      state.loading = true;
    },
    successGetOne: (state, action) => {
      state.loading = false;
      state.item = action.payload;
    },
    failureGetOne: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Filtered Ads
    filteredAds: (state, action) => {
      (state.isFiltered = true),
        (state.filteredItems = [
          ...state.items
            .filter((p) => {
              if (
                action.payload.departure_date != "" &&
                action.payload.departure_date != undefined
              ) {
                return p.departure_date === action.payload.departure_date;
              } else {
                return p;
              }
            })
            .filter((p) => {
              if (
                action.payload.arrival_date != "" &&
                action.payload.arrival_date != undefined
              ) {
                return p.arrival_date === action.payload.arrival_date;
              } else {
                return p;
              }
            })
            .filter((p) => {
              if (
                action.payload.departure_country != "" &&
                action.payload.departure_country != undefined
              ) {
                return p.departure_country === action.payload.departure_country;
              } else {
                return p;
              }
            })
            .filter((p) => {
              if (
                action.payload.arrival_country != "" &&
                action.payload.arrival_country != undefined
              ) {
                return p.arrival_country === action.payload.arrival_country;
              } else {
                return p;
              }
            })
            .filter((p) => {
              if (
                action.payload.category_id != "" &&
                action.payload.category_id != undefined
              ) {
                return p.category_id === action.payload.category_id;
              } else {
                return p;
              }
            })
            .filter((p) => {
              if (
                action.payload.status_id != "" &&
                action.payload.status_id != undefined
              ) {
                return p.status_id === action.payload.status_id;
              } else {
                return p;
              }
            }),
        ]);
    },
    resetFilter: (state) => {
      (state.isFiltered = false), (state.filteredItems = []);
    },
    // Filter my ads
    filteredMyAds: (state, action) => {
      (state.isFiltered = true),
        (state.filteredItems = [
          ...state.userAds
            .filter((p) => {
              if (
                action.payload.departure_date != "" &&
                action.payload.departure_date != undefined
              ) {
                return p.departure_date === action.payload.departure_date;
              } else {
                return p;
              }
            })
            .filter((p) => {
              if (
                action.payload.arrival_date != "" &&
                action.payload.arrival_date != undefined
              ) {
                return p.arrival_date === action.payload.arrival_date;
              } else {
                return p;
              }
            })
            .filter((p) => {
              if (
                action.payload.departure_country != "" &&
                action.payload.departure_country != undefined
              ) {
                return p.departure_country === action.payload.departure_country;
              } else {
                return p;
              }
            })
            .filter((p) => {
              if (
                action.payload.arrival_country != "" &&
                action.payload.arrival_country != undefined
              ) {
                return p.arrival_country === action.payload.arrival_country;
              } else {
                return p;
              }
            })
            .filter((p) => {
              if (
                action.payload.category_id != "" &&
                action.payload.category_id != undefined
              ) {
                return p.category_id === action.payload.category_id;
              } else {
                return p;
              }
            })
            .filter((p) => {
              if (
                action.payload.status_id != "" &&
                action.payload.status_id != undefined
              ) {
                return p.status_id === action.payload.status_id;
              } else {
                return p;
              }
            }),
        ]);
    },
    resetFilterMyAds: (state) => {
      (state.isFiltered = false), (state.filteredItems = []);
    },
    selectedAdminAd: (state, action) => {
      state.item = state.adminAds.find((item) => item.id === action.payload);
      state.messageSent = false;
    },
    selectedAd: (state, action) => {
      state.item = state.items.find((item) => item.id === action.payload);
      state.messageSent = false;
    },
    selectedMyAd: (state, action) => {
      state.item = state.userAds.find((item) => item.id === action.payload);
    },
    // Reject
    requestReject: (state) => {
      state.loading = true;
    },
    successReject: (state, action) => {
      state.loading = false;
      state.adminAds = [
        ...state.adminAds.map((p) => {
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
      state.adminAds = [
        ...state.adminAds.map((p) => {
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
    // User ads
    requestUserAds: (state) => {
      state.loading = true;
    },
    successUserAds: (state, action) => {
      state.loading = false;
      state.userAds = action.payload;
    },
    failureUserAds: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Update ads
    requestUpdate: (state) => {
      state.loading = true;
    },
    successUpdate: (state, action) => {
      state.loading = false;
      state.items = [
        ...state.items.map((p) => {
          if (p.id === action.payload.id) {
            p = action.payload;
          }
          return p;
        }),
      ];
      state.userAds = [
        ...state.userAds.map((p) => {
          if (p.id === action.payload.id) {
            p = action.payload;
          }
          return p;
        }),
      ];
      state.adminAds = [
        ...state.adminAds.map((p) => {
          if (p.id === action.payload.id) {
            p = action.payload;
          }
          return p;
        }),
      ];
    },
    failureUpdate: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Admin ads
    requestAdminAds: (state) => {
      state.loading = true;
    },
    successAdminAds: (state, action) => {
      state.loading = false;
      state.adminAds = action.payload;
    },
    failureAdminAds: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Message
    requestMessageAd: (state) => {
      state.loading = true;
    },
    successMessageAd: (state, action) => {
      state.loading = false;
      state.messageSent = action.payload;
    },
    failureMessageAd: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Closed Ad
    requestClosedAd: (state) => {
      state.loading = true;
    },
    successClosedAd: (state, action) => {
      state.loading = false;
      state.item = action.payload;
    },
    failureClosedAd: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Ad Message
    requestUserAdMessage: (state) => {
      state.loading = true;
    },
    successUserAdMessage: (state, action) => {
      state.loading = false;
      state.adMessages = action.payload;
    },
    failureUserAdMessage: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Response Ad Message
    requestResponseAdMessage: (state) => {
      state.loading = true;
    },
    successResponseAdMessage: (state, action) => {
      state.loading = false;
      state.messageSent = action.payload;
    },
    failureResponseAdMessage: (state, action) => {
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
  selectedMyAd,
  requestReject,
  successReject,
  failureReject,
  requestApprove,
  successApprove,
  failureApprove,
  requestUserAds,
  successUserAds,
  failureUserAds,
  requestUpdate,
  successUpdate,
  failureUpdate,
  requestAdminAds,
  successAdminAds,
  failureAdminAds,
  requestMessageAd,
  successMessageAd,
  failureMessageAd,
  selectedAdminAd,
  requestClosedAd,
  successClosedAd,
  failureClosedAd,
  filteredMyAds,
  resetFilterMyAds,
  requestGetOne,
  successGetOne,
  failureGetOne,
  requestUserAdMessage,
  successUserAdMessage,
  failureUserAdMessage,
  requestResponseAdMessage,
  successResponseAdMessage,
  failureResponseAdMessage,
  requestGetAllPaginage,
  successGetAllPaginate,
  failureGetAllPaginate
} = adSlice.actions;

export const adReducer = adSlice.reducer;
