import {
  failureAdd,
  failureGetAll,
  requestAdd,
  requestGetAll,
  successAdd,
  successGetAll,
} from "../reducers/profiles.reducers";
import { profileServices } from "../services/profiles.services";

export const profileActions = {
  getAll,
  add,
};

function getAll() {
  return function (dispatch) {
    dispatch(requestGetAll());
    profileServices
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
    profileServices
      .api_add(firstname, lastname, phone, email, profile_id, password)
      .then((res) => {
        dispatch(successAdd(res.data));
      })
      .catch((err) => {
        dispatch(failureAdd(err.message));
      });
  };
}