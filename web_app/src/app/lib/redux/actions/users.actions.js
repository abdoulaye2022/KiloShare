import { getAll_users } from "@/app/actions/users/getAll";
import {
  failureAdd,
  failureGetAll,
  failureIsValidJwt,
  failureLogin,
  failureLogOut,
  failureRemove,
  failureSignin,
  failureSuspend,
  failureUnsuspend,
  failureUpdate,
  requestAdd,
  requestGetAll,
  requestIsValidJwt,
  requestLogin,
  requestLogOut,
  requestRemove,
  requestResetItem,
  requestSetIten,
  requestSignin,
  requestSuspend,
  requestUnsuspend,
  requestUpdate,
  resetError,
  successAdd,
  successGetAll,
  successIsValidJwt,
  successLogin,
  successLogOut,
  successRemove,
  successSignin,
  successSuspend,
  successUnsuspend,
  successUpdate,
} from "../reducers/users.reducers";
import { modalActions } from "./modals.actions";
import { add_user } from "@/app/actions/users/add";
import { update_user } from "@/app/actions/users/update";
import { remove_user } from "@/app/actions/users/remove";
import { suspend_user } from "@/app/actions/users/suspend";
import { unsuspend_user } from "@/app/actions/users/unsuspend";
import { isValidJwt_user } from "@/app/actions/auth/isValidJwt";
import { logout_user } from "@/app/actions/auth/logout";
import { login_user } from "@/app/actions/auth/login";
import { signin_user } from "@/app/actions/auth/signin";
import { adActions } from "./ads.actions";

export const userActions = {
  login,
  logout,
  signin,
  getAll,
  add,
  setItem,
  resetItem,
  update,
  remove,
  suspend,
  unsuspend,
  isValidJwt,
  resetError
};

function login(email, password) {
  return function (dispatch) {
    dispatch(requestLogin());
    login_user(email, password)
      .then((res) => {
        dispatch(successLogin(res.data));
        dispatch(modalActions.closeLoginForm());
        dispatch(adActions.getAll());
      })
      .catch((err) => {
        dispatch(failureLogin(err.message));
      });
  };
}

function signin(firstname, lastname, email, password) {
  return function (dispatch) {
    dispatch(requestSignin());
    signin_user(firstname, lastname, email, password)
      .then((res) => {
        dispatch(successSignin(res.data));
        dispatch(modalActions.closeSigninForm());
      })
      .catch((err) => {
        dispatch(failureSignin(err.message));
      });
  };
}

function logout(cb) {
  return function (dispatch) {
    dispatch(requestLogOut());
    logout_user()
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
    getAll_users()
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
    add_user(firstname, lastname, phone, email, profile_id, password)
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
    update_user(id, firstname, lastname, email, profile_id)
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
    remove_user(id)
      .then((res) => {
        dispatch(successRemove(id));
        dispatch(modalActions.closeUserForm());
      })
      .catch((err) => {
        dispatch(failureRemove(err.message));
      });
  };
}

function suspend(id) {
  return function (dispatch) {
    dispatch(requestSuspend());
    suspend_user(id)
      .then((res) => {
        dispatch(successSuspend(id));
      })
      .catch((err) => {
        dispatch(failureSuspend(err.message));
      });
  };
}

function unsuspend(id) {
  return function (dispatch) {
    dispatch(requestUnsuspend());
    unsuspend_user(id)
      .then((res) => {
        dispatch(successUnsuspend(id));
      })
      .catch((err) => {
        dispatch(failureUnsuspend(err.message));
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

function isValidJwt(cb) {
  return function (dispatch) {
    dispatch(requestIsValidJwt());
    isValidJwt_user()
      .then((res) => {
        dispatch(successIsValidJwt());
      })
      .catch((err) => {
        dispatch(logout(cb));
        dispatch(failureIsValidJwt(err.message));
      });
  };
}
