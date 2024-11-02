import { configureStore, Tuple } from "@reduxjs/toolkit";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import rootReducers from "./reducers/root.reducers";
import { thunk } from "redux-thunk";

export const makeStore = () => {
  return configureStore({
    reducer: rootReducers,
    //  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger,thunk]),
    middleware: () => new Tuple(thunk, logger),
  });
};
