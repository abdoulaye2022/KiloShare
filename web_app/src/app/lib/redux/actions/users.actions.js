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
  requestRequestResetPassword,
  successRequestResetPassword,
  failureRequestResetPassword,
  requestResetPasswordReducer,
  successResetPassword,
  failureResetPassword,
  requestVerifiedEmail,
  successVerifiedEmail,
  failureVerifiedEmail,
  stopLoadingLogOut,
  requestRefreshToken,
  successRefreshToken,
  failureRefreshToken
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
import { requestResetPassword_user } from "@/app/actions/auth/requestResetPassword";
import { resetPassword_user } from "@/app/actions/auth/resetPassword";
import { getJwt_user } from "@/app/actions/auth/getJwt";
import { verifiedEmail_user } from "@/app/actions/auth/verifiedEmail";
import { preferenceActions } from "./preferences.actions";

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
  requestResetPassword,
  resetPassword,
  verifiedEmail,
  stopLoadingLogOut,
  successLogOut,
  refreshToken
};

function login(email, password) {
  return function (dispatch) {
    dispatch(requestLogin());
    login_user(email, password)
      .then((res) => {
        if (res.data) {
          dispatch(successLogin(res.data));
          dispatch(modalActions.closeLoginForm());
          dispatch(adActions.getAll(1, 5));
          dispatch(preferenceActions.addDefaultPreference());
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
          dispatch(preferenceActions.addDefaultPreference());
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

function logout(cb = null) {
  return function (dispatch) {
    dispatch(requestLogOut());
    logout_user()
      .then((res) => {
        if (res) {
          if (cb) {
            cb();
          } else {
            dispatch(successLogOut());
            dispatch(stopLoadingLogOut());
            dispatch(adActions.getAll(1, 5));
            dispatch(categoryActions.getAll());
          }
          
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

function refreshToken() {
  return function (dispatch) {
    dispatch(requestRefreshToken());
    logout_user()
      .then((res) => {
        if (res) {  
            dispatch(successRefreshToken());          
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureRefreshToken(parsedError.message));
          }
        } catch {
          dispatch(failureRefreshToken("An unexpected error occurred."));
        }
      });
  };
}

function getAll() {
  return function (dispatch) {
    dispatch(requestGetAll());
    getAll_users()
      .then((res) => {
        if(res.status === 401) {
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

function add(firstname, lastname, phone, email, profile_id, password) {
  return function (dispatch) {
    dispatch(
      requestAdd(firstname, lastname, phone, email, profile_id, password)
    );
    add_user(firstname, lastname, phone, email, profile_id, password)
      .then((res) => {
        if(res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
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
        if(res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
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
        if(res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
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
        if(res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
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
        if(res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
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
        if(res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
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
        if(res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
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
        if(res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
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
        if(res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
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

function requestResetPassword(email) {
  return function (dispatch) {
    dispatch(requestRequestResetPassword());
    requestResetPassword_user(email)
      .then((res) => {
        if(res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
        if (res.success) {
          dispatch(successRequestResetPassword(res.data));
          dispatch(modalActions.closeRequestResetPassword());
          message.success(
            "A password reset email has been sent to your inbox. Please check your email and follow the instructions to reset your password."
          );
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureRequestResetPassword(parsedError.message));
            message.error(parsedError.message);
          }
        } catch {
          dispatch(
            failureRequestResetPassword("An unexpected error occurred.")
          );
        }
      });
  };
}

function resetPassword(password, token, cb) {
  return function (dispatch) {
    dispatch(requestResetPasswordReducer());
    resetPassword_user(password, token)
      .then((res) => {
        if(res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
        if (res.data) {
          dispatch(successResetPassword(res.data));
          dispatch(modalActions.closeResetPassword());
          message.success("Password updated successfully.");
          cb();
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureResetPassword(parsedError.message));
            message.error(parsedError.message);
          }
        } catch {
          dispatch(failureResetPassword("An unexpected error occurred."));
        }
      });
  };
}

function verifiedEmail(email) {
  return function (dispatch) {
    dispatch(requestVerifiedEmail());
    verifiedEmail_user(email)
      .then((res) => {
        if(res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
        if (res.data) {
          dispatch(successVerifiedEmail(res.data));
          dispatch(modalActions.closeVerifiedEmail());
          message.success("Link sent successfully.");
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureVerifiedEmail(parsedError.message));
            message.error(parsedError.message);
          }
        } catch {
          dispatch(failureVerifiedEmail("An unexpected error occurred."));
        }
      });
  };
}
