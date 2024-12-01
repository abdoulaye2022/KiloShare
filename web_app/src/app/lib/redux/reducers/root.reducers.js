import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./users.reducers";
import { persistReducer } from "redux-persist";
import { profileReducer } from "./profiles.reducers";
import { modalReducer } from "./modals.reducers";
import { menusReducer } from "./menus.reducers";
import { categoryReducer } from "./categories.reducers";
import { adReducer } from "./ads.reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "profile", "modal", "menu", "category"],
};

const appInitialState = {
  user: {
    loading: false,
    authenticated: false,
    user: {},
    item: {},
    items: [],
    error: "",
  },
  profile: {
    loading: false,
    item: {},
    items: [],
    error: "",
  },
  category: {
    loading: false,
    item: {},
    items: [],
    error: "",
  }
};

const appReducers = combineReducers({
  user: userReducer,
  profile: profileReducer,
  modal: modalReducer,
  menu: menusReducer,
  category: categoryReducer,
  ad: adReducer
});

const rootReducer = (state, action) => {
  if (action.type === "user/successLogOut") {
    state = appInitialState;
  }
  return appReducers(state, action);
};

export default persistReducer(persistConfig, rootReducer);
