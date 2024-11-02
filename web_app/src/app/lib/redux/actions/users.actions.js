import { userConstants } from "../constants/users.constants";
import {
  failureGetAll,
  failureLogin,
  requestGetAll,
  requestLogin,
  successGetAll,
  successLogin,
} from "../reducers/users.reducers";
import { userServices } from "../services/users.services";

export const userActions = {
  login,
  getAll,
};

function login(phone, password, cb) {
  return function (dispatch) {
    dispatch(requestLogin());
    userServices
      .loginUser(phone, password)
      .then((res) => {
        dispatch(successLogin(res.data));
        cb();
      })
      .catch((err) => {
        dispatch(failureLogin(err.message));
      });
  };
}

function getAll() {
  return function (dispatch) {
    dispatch(requestGetAll());
    userServices
      .getAllUser()
      .then((res) => {
        dispatch(successGetAll(res.data));
      })
      .catch((err) => {
        dispatch(failureGetAll(err.message));
      });
  };
}
