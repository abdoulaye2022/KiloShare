import { getAll_ads } from "@/app/actions/ads/getAll";
import {
  failureAdd,
  failureGetAll,
  requestAdd,
  requestGetAll,
  successAdd,
  successGetAll,
} from "../reducers/ads.reducers";
import { modalActions } from "./modals.actions";
import { add_ad } from "@/app/actions/ads/add";

export const adActions = {
  add,
  getAll,
};

function getAll() {
  return function (dispatch) {
    dispatch(requestGetAll());
    getAll_ads()
      .then((res) => {
        dispatch(successGetAll(res.data));
      })
      .catch((err) => {
        dispatch(failureGetAll(err.message));
      });
  };
}

function add(data) {
  return function (dispatch) {
    dispatch(requestAdd());
    add_ad(data)
      .then((res) => {
        dispatch(successAdd(res.data));
        dispatch(modalActions.openAdApprovalNotice());
      })
      .catch((err) => {
        dispatch(failureAdd(err.message));
      });
  };
}
