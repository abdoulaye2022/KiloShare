import { getAll_users } from "@/app/actions/users/getAll";
import {
  failureAdd,
  failureConfirmEmail,
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
  requestConfirmEmail,
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
  successConfirmEmail,
  successGetAll,
  successIsValidJwt,
  successLogin,
  successLogOut,
  successRemove,
  successSignin,
  successSuspend,
  successUnsuspend,
  successUpdate,
  requestUpdateUserProfil,
  successUpdateUserProfil,
  failureUpdateUserProfil,
  requestChangePassword,
  successChangePassword,
  failureChangePassword,
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
import { confirmEmail_user } from "@/app/actions/auth/confirmEmail";
import { categoryActions } from "./categories.actions";
import { updateUserProfil_user } from "@/app/actions/users/updateUserProfil";
import { changePassword_user } from "@/app/actions/auth/changePassword";
import { message } from "antd";

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
  resetError,
  confirmEmail,
  updateUserProfil,
  changePassword,
};

function login(email, password) {
  return function (dispatch) {
    dispatch(requestLogin());
    login_user(email, password)
      .then((res) => {
        if (res.data) {
          dispatch(successLogin(res.data));
          dispatch(modalActions.closeLoginForm());
          dispatch(adActions.getAll());
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureLogin(parsedError.message));
          }
        } catch {
          dispatch(failureLogin("An unexpected error occurred."));
        }
      });
  };
}

function signin(firstname, lastname, email, password) {
  return function (dispatch) {
    dispatch(requestSignin());
    signin_user(firstname, lastname, email, password)
      .then((res) => {
        if (res.data) {
          dispatch(successSignin(res.data));
          dispatch(modalActions.closeSigninForm());
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureSignin(parsedError.message));
          }
        } catch {
          dispatch(failureSignin("An unexpected error occurred."));
        }
      });
  };
}

function logout(cb) {
  return function (dispatch) {
    dispatch(requestLogOut());
    logout_user()
      .then((res) => {
        if (res) {
          dispatch(successLogOut());
          cb();
          dispatch(adActions.getAll());
          dispatch(categoryActions.getAll());
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureLogOut(parsedError.message));
          }
        } catch {
          dispatch(failureLogOut("An unexpected error occurred."));
        }
      });
  };
}

function getAll() {
  return function (dispatch) {
    dispatch(requestGetAll());
    getAll_users()
      .then((res) => {
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

function add(firstname, lastname, phone, email, profile_id, password) {
  return function (dispatch) {
    dispatch(
      requestAdd(firstname, lastname, phone, email, profile_id, password)
    );
    add_user(firstname, lastname, phone, email, profile_id, password)
      .then((res) => {
        if (res.data) {
          dispatch(successAdd(res.data));
          dispatch(modalActions.closeUserForm());
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureAdd(parsedError.message));
          }
        } catch {
          dispatch(failureAdd("An unexpected error occurred."));
        }
      });
  };
}

function update(id, firstname, lastname, email, profile_id) {
  return function (dispatch) {
    dispatch(requestUpdate());
    update_user(id, firstname, lastname, email, profile_id)
      .then((res) => {
        if (res.data) {
          dispatch(successUpdate(res.data));
          dispatch(modalActions.closeUserForm());
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureUpdate(parsedError.message));
          }
        } catch {
          dispatch(failureUpdate("An unexpected error occurred."));
        }
      });
  };
}

function updateUserProfil(firstname, lastname, phone) {
  return function (dispatch) {
    dispatch(requestUpdateUserProfil());
    updateUserProfil_user(firstname, lastname, phone)
      .then((res) => {
        if (res.data) {
          dispatch(successUpdateUserProfil(res.data));
          message.success("Profile updated successfully");
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureUpdateUserProfil(parsedError.message));
            message.error(parsedError.message);
          }
        } catch {
          dispatch(failureUpdateUserProfil("An unexpected error occurred."));
        }
      });
  };
}

function remove(id) {
  return function (dispatch) {
    dispatch(requestRemove());
    remove_user(id)
      .then((res) => {
        if (res.data) {
          dispatch(successRemove(id));
          dispatch(modalActions.closeUserForm());
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureRemove(parsedError.message));
          }
        } catch {
          dispatch(failureRemove("An unexpected error occurred."));
        }
      });
  };
}

function suspend(id) {
  return function (dispatch) {
    dispatch(requestSuspend());
    suspend_user(id)
      .then((res) => {
        if (res.data) {
          dispatch(successSuspend(id));
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureSuspend(parsedError.message));
          }
        } catch {
          dispatch(failureSuspend("An unexpected error occurred."));
        }
      });
  };
}

function unsuspend(id) {
  return function (dispatch) {
    dispatch(requestUnsuspend());
    unsuspend_user(id)
      .then((res) => {
        if (res.data) {
          dispatch(successUnsuspend(id));
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureUnsuspend(parsedError.message));
          }
        } catch {
          dispatch(failureUnsuspend("An unexpected error occurred."));
        }
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
        if (res.success) {
          dispatch(successIsValidJwt());
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureIsValidJwt(parsedError.message));
            dispatch(logout(cb));
          }
        } catch {
          dispatch(failureIsValidJwt("An unexpected error occurred."));
          dispatch(logout(cb));
        }
      });
  };
}

function confirmEmail(token) {
  return function (dispatch) {
    dispatch(requestConfirmEmail());
    confirmEmail_user(token)
      .then((res) => {
        if (res.success) {
          dispatch(successConfirmEmail(res.data));
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureConfirmEmail(parsedError.message));
          }
        } catch {
          dispatch(failureConfirmEmail("An unexpected error occurred."));
        }
      });
  };
}

function changePassword(oldPassword, newPassword) {
  return function (dispatch) {
    dispatch(requestChangePassword());
    changePassword_user(oldPassword, newPassword)
      .then((res) => {
        if (res.success) {
          dispatch(successChangePassword(res.data));
          message.success("Password updated successfully");
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureChangePassword(parsedError.message));
            message.error(parsedError.message);
          }
        } catch {
          dispatch(failureChangePassword("An unexpected error occurred."));
        }
      });
  };
}
