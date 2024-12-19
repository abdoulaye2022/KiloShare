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
  selectedAd,
  selectedMyAd,
  requestReject,
  successReject,
  failureReject,
  requestApprove,
  successApprove,
  failureApprove,
  requestUserAds,
  successUserAds,
  failureUserAds,
  requestUpdate,
  successUpdate,
  failureUpdate,
} from "../reducers/ads.reducers";
import { modalActions } from "./modals.actions";
import { add_ad } from "@/app/actions/ads/add";
import { reject_ad } from "@/app/actions/ads/reject";
import { drawerActions } from "./drawers.actions";
import { message } from "antd";
import { approve_ad } from "@/app/actions/ads/approve";
import { userAds_ads } from "@/app/actions/ads/userAds";
import { update_ad } from "@/app/actions/ads/update";

export const adActions = {
  add,
  getAll,
  filteredAds,
  resetFilter,
  selectedAd,
  selectedMyAd,
  reject,
  approve,
  userAds,
  update,
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

function reject(id, reason) {
  return function (dispatch) {
    dispatch(requestReject());
    reject_ad(id, reason)
      .then((res) => {
        if (res.data) {
          dispatch(successReject(res.data));
          dispatch(drawerActions.closeOpenAdsDrawer());
          message.success("Ad rejected successfully");
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureReject(parsedError.message));
            message.error(err.message);
          }
        } catch {
          dispatch(failureReject("An unexpected error occurred."));
        }
      });
  };
}

function approve(id) {
  return function (dispatch) {
    dispatch(requestApprove());
    approve_ad(id)
      .then((res) => {
        if (res.data) {
          dispatch(successApprove(res.data));
          dispatch(drawerActions.closeOpenAdsDrawer());
          message.success("Ad approved successfully");
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureApprove(parsedError.message));
            message.error(err.message);
          }
        } catch {
          dispatch(failureApprove("An unexpected error occurred."));
        }
      });
  };
}

function userAds(id) {
  return function (dispatch) {
    dispatch(requestUserAds());
    userAds_ads(id)
      .then((res) => {
        if (res.data) {
          dispatch(successUserAds(res.data));
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureUserAds(parsedError.message));
          }
        } catch {
          dispatch(failureUserAds("An unexpected error occurred."));
        }
      });
  };
}

function update(id, data) {
  return function (dispatch) {
    dispatch(requestUpdate());
    update_ad(id, data)
      .then((res) => {
        if (res.data) {
          dispatch(successUpdate(res.data));
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
