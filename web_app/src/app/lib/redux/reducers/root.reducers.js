import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./users.reducers";
import { persistReducer } from "redux-persist";
import { profileReducer } from "./profiles.reducers";
import { modalReducer } from "./modals.reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "profile", "modal"], // Optionnel : liste de reducers à persister
};

const appReducers = combineReducers({
  user: userReducer,
  profile: profileReducer,
  modal: modalReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_USER_SUCCESS") {
    storage.removeItem("persist:root"); // Supprime le stockage persistant
    state = undefined; // Réinitialise l'état de Redux
  }
  return appReducers(state, action);
};

export default persistReducer(persistConfig, rootReducer);
