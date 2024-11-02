import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./users.reducers";
import { persistReducer } from "redux-persist";

// configure which keuy we want to persist
const PersistConfig = {
  key: "root",
  storage,
};

const appReducers = combineReducers({
  user: persistReducer(PersistConfig, userReducer),
});

const rootReducers = (state, action) => {
  if (action.type === "LOGOUT_USER") {
    storage.removeItem("persist:root");

    return appReducers(undefined, action);
  }
  return appReducers(state, action);
};

export default rootReducers;
