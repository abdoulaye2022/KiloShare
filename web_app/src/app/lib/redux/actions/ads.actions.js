import { getAll_ads } from "@/app/actions/ads/getAll";
import {
  failureAdd,
  failureGetAll,
  requestAdd,
  requestGetAll,
  successAdd,
  successGetAll,
  filteredAds,
  resetFilter,
} from "../reducers/ads.reducers";
import { modalActions } from "./modals.actions";
import { add_ad } from "@/app/actions/ads/add";

export const adActions = {
  add,
  getAll,
  filteredAds,
  resetFilter,
};

function getAll() {
  return function (dispatch) {
    dispatch(requestGetAll());
    getAll_ads()
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

function add(data) {
  return function (dispatch) {
    dispatch(requestAdd());
    add_ad(data)
      .then((res) => {
        dispatch(successAdd(res.data));
        dispatch(modalActions.openAdApprovalNotice());
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
