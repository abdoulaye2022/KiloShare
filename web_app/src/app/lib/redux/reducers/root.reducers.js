import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./users.reducers";
import { persistReducer } from "redux-persist";
import { profileReducer } from "./profiles.reducers";
import { modalReducer } from "./modals.reducers";
import { menusReducer } from "./menus.reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "profile", "modal", "menu"],
};

const appReducers = combineReducers({
  user: userReducer,
  profile: profileReducer,
  modal: modalReducer,
  menu: menusReducer
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_USER_SUCCESS") {
    storage.removeItem("persist:root");
    state = undefined;
  }
  return appReducers(state, action);
};

export default persistReducer(persistConfig, rootReducer);
