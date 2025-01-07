import { combineReducers } from "redux";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer, createTransform } from "redux-persist";
import { userReducer } from "./users.reducers";
import { profileReducer } from "./profiles.reducers";
import { modalReducer } from "./modals.reducers";
import { menusReducer } from "./menus.reducers";
import { categoryReducer } from "./categories.reducers";
import { adReducer } from "./ads.reducers";
import CryptoJS from "crypto-js";
import { drawerReducer } from "./drawers.reducers";
import { statusReducer } from "./status.reducers";
import { preferenceReducer } from "./preferences.reducers";
import { contactReducer } from "./contacts.reducers";

const encryptTransform = createTransform(
  (inboundState) => {
    if (!inboundState) return inboundState;

    return {
      ...inboundState,
      sensitiveData: inboundState.sensitiveData
        ? CryptoJS.AES.encrypt(
            JSON.stringify(inboundState.sensitiveData),
            process.env.NEXT_PUBLIC_SECRET_KEY
          ).toString()
        : null,
    };
  },
  (outboundState) => {
    if (!outboundState) return outboundState;

    return {
      ...outboundState,
      sensitiveData: outboundState.sensitiveData
        ? JSON.parse(
            CryptoJS.AES.decrypt(
              outboundState.sensitiveData,
              process.env.NEXT_PUBLIC_SECRET_KEY
            ).toString(CryptoJS.enc.Utf8)
          )
        : null,
    };
  },
  { whitelist: ["user", "profile", "ad", "preference"] }
);

const persistConfig = {
  key: "root",
  storage: storageSession,
  transforms: [encryptTransform],
};

const appReducers = combineReducers({
  user: userReducer,
  profile: profileReducer,
  modal: modalReducer,
  menu: menusReducer,
  category: categoryReducer,
  ad: adReducer,
  drawer: drawerReducer,
  status: statusReducer,
  preference: preferenceReducer,
  contact: contactReducer
});

const rootReducer = (state, action) => {
  if (action.type === "user/successLogOut") {
    storageSession.removeItem("persist:root");
    state = undefined;
  }
  return appReducers(state, action);
};

export default persistReducer(persistConfig, rootReducer);
