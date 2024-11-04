import {
  failureAdd,
  failureGetAll,
  failureLogin,
  failureLogOut,
  failureRemove,
  failureUpdate,
  requestAdd,
  requestGetAll,
  requestLogin,
  requestLogOut,
  requestRemove,
  requestResetItem,
  requestSetIten,
  requestUpdate,
  successAdd,
  successGetAll,
  successLogin,
  successLogOut,
  successRemove,
  successUpdate,
} from "../reducers/users.reducers";
import { userServices } from "../services/users.services";
import { modalActions } from "./modals.actions";

export const userActions = {
  login,
  logout,
  getAll,
  add,
  setItem,
  resetItem,
  update,
  remove,
};

function login(phone, password, cb) {
  return function (dispatch) {
    dispatch(requestLogin());
    userServices
      .api_login(phone, password)
      .then((res) => {
        dispatch(successLogin(res.data));
        cb();
      })
      .catch((err) => {
        dispatch(failureLogin(err.message));
      });
  };
}

function logout(cb) {
  return function (dispatch) {
    dispatch(requestLogOut());
    userServices
      .api_logout()
      .then((res) => {
        dispatch(successLogOut(res.data));
        cb();
      })
      .catch((err) => {
        dispatch(failureLogOut(err.message));
      });
  };
}

function getAll() {
  return function (dispatch) {
    dispatch(requestGetAll());
    userServices
      .api_getAll()
      .then((res) => {
        dispatch(successGetAll(res.data));
      })
      .catch((err) => {
        dispatch(failureGetAll(err.message));
      });
  };
}

function add(firstname, lastname, phone, email, profile_id, password) {
  return function (dispatch) {
    dispatch(
      requestAdd(firstname, lastname, phone, email, profile_id, password)
    );
    userServices
      .api_add(firstname, lastname, phone, email, profile_id, password)
      .then((res) => {
        dispatch(successAdd(res.data));
        dispatch(modalActions.closeUserForm());
      })
      .catch((err) => {
        dispatch(failureAdd(err.message));
      });
  };
}

function update(id, firstname, lastname, email, profile_id) {
  return function (dispatch) {
    dispatch(requestUpdate());
    userServices
      .api_update(id, firstname, lastname, email, profile_id)
      .then((res) => {
        dispatch(successUpdate(res.data));
        dispatch(modalActions.closeUserForm());
      })
      .catch((err) => {
        dispatch(failureUpdate(err.message));
      });
  };
}

function remove(id) {
  return function (dispatch) {
    dispatch(requestRemove());
    userServices
      .api_remove(id)
      .then((res) => {
        dispatch(successRemove(id));
        dispatch(modalActions.closeUserForm());
      })
      .catch((err) => {
        dispatch(failureRemove(err.message));
      });
  };
}

function setItem(id) {
  return function (dispatch) {
    dispatch(requestSetIten(id));
  };
}

function resetItem(id) {
  return function (dispatch) {
    dispatch(requestResetItem(id));
  };
}
