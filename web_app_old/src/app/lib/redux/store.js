import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import persistedReducer from "./reducers/root.reducers";
import { persistStore } from "redux-persist";

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }).concat(logger),
});

const persistor = persistStore(store);

export { store, persistor };
