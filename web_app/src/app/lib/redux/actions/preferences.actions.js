import { addDefault_preferences } from "@/app/actions/preferences/addDefaultPreference";
import {
  failureGetAll,
  requestGetAll,
  successGetAll,
  requestAddDefault,
  successAddDefault,
  failureAddDefault,
  requestUpdateDefault,
  successUpdateDefault,
  failureUpdateDefault,
  requestLanguage,
  successLanguage,
  failureLanguage,
  requestLanguageUser,
  successLanguageUser,
  failureLanguageUser
} from "../reducers/preferences.reducers";
import { getAll_preferences } from "@/app/actions/preferences/getAll";
import { updatePreference_preferences } from "@/app/actions/preferences/updatePreference";
import { setLanguage } from "@/app/actions/others/setLanguage";
import { getLanguage } from "@/app/actions/others/getLanguage";

export const preferenceActions = {
  getAll,
  addDefaultPreference,
  update,
  changeLangage,
  currentLanguage
};

function getAll() {
  return function (dispatch) {
    dispatch(requestGetAll());
    getAll_preferences()
      .then((res) => {
        if (res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
        if (res.data) {
          dispatch(successGetAll(res.data));
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureGetAll(parsedError.message));
          }
        } catch {
          dispatch(failureGetAll("An unexpected error occurred."));
        }
      });
  };
}

function addDefaultPreference() {
  return function (dispatch) {
    dispatch(requestAddDefault());
    addDefault_preferences()
      .then((res) => {
        if (res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
        if (res.data) {
          dispatch(successAddDefault(res.data));
          dispatch(changeLangage(res.data.user_language))
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureAddDefault(parsedError.message));
          }
        } catch {
          dispatch(failureAddDefault("An unexpected error occurred."));
        }
      });
  };
}

function update(key, value) {
  return function (dispatch) {
    dispatch(requestUpdateDefault());
    updatePreference_preferences(key, value)
      .then((res) => {
        if (res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
        if (res.data) {
          dispatch(successUpdateDefault(res.data));
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureUpdateDefault(parsedError.message));
          }
        } catch {
          dispatch(failureUpdateDefault("An unexpected error occurred."));
        }
      });
  };
}

function changeLangage(langue) {
  return function (dispatch) {
    dispatch(requestLanguage());
    setLanguage(langue)
      .then((res) => {
        if (res) {
          dispatch(successLanguage(res));
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureLanguage(parsedError.message));
          }
        } catch {
          dispatch(failureLanguage("An unexpected error occurred."));
        }
      });
  };
}

function currentLanguage() {
  return function (dispatch) {
    dispatch(requestLanguageUser());
    getLanguage()
      .then((res) => {
        if (res) {
          dispatch(successLanguageUser(res));
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureLanguageUser(parsedError.message));
          }
        } catch {
          dispatch(failureLanguageUser("An unexpected error occurred."));
        }
      });
  };
}
