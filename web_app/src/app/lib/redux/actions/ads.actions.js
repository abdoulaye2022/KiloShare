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
  requestAdminAds,
  successAdminAds,
  failureAdminAds,
  requestMessageAd,
  successMessageAd,
  failureMessageAd,
  selectedAdminAd,
  requestClosedAd,
  successClosedAd,
  failureClosedAd,
  filteredMyAds,
  resetFilterMyAds
} from "../reducers/ads.reducers";
import { modalActions } from "./modals.actions";
import { add_ad } from "@/app/actions/ads/add";
import { reject_ad } from "@/app/actions/ads/reject";
import { drawerActions } from "./drawers.actions";
import { message } from "antd";
import { approve_ad } from "@/app/actions/ads/approve";
import { userAds_ads } from "@/app/actions/ads/userAds";
import { update_ad } from "@/app/actions/ads/update";
import { adminAds_ads } from "@/app/actions/ads/adminAds";
import { messageAd_ad } from "@/app/actions/ads/messageAd";
import { userActions } from "./users.actions";
import { closeAd_ad } from "@/app/actions/ads/closedAd";

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
  adminAds,
  messageAd,
  closedAd,
  selectedAdminAd,
  filteredMyAds,
  resetFilterMyAds
};

function getAll() {
  return function (dispatch) {
    dispatch(requestGetAll());
    getAll_ads()
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

function add(data) {
  return function (dispatch) {
    dispatch(requestAdd());
    add_ad(data)
      .then((res) => {
        if(res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
        if (res.data) {
          dispatch(successAdd(res.data));
          dispatch(modalActions.openAdApprovalNotice());
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

function reject(id, reason) {
  return function (dispatch) {
    dispatch(requestReject());
    reject_ad(id, reason)
      .then((res) => {
        if(res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
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
        if(res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
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
        if(res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
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
            message.error(err.message);
          }
        } catch {
          dispatch(failureUserAds("An unexpected error occurred."));
        }
      });
  };
}

function update(id, data, cb) {
  return function (dispatch) {
    dispatch(requestUpdate());
    update_ad(id, data)
      .then((res) => {
        if(res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
        if (res.data) {
          dispatch(successUpdate(res.data));
          message.success("Ad updated successfully");
          cb();
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureUpdate(parsedError.message));
            message.error(err.message);
          }
        } catch {
          dispatch(failureUpdate("An unexpected error occurred."));
        }
      });
  };
}

function adminAds() {
  return function (dispatch) {
    dispatch(requestAdminAds());
    adminAds_ads()
      .then((res) => {
        if(res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
        if (res.data) {
          dispatch(successAdminAds(res.data));
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureAdminAds(parsedError.message));
          }
        } catch {
          dispatch(failureAdminAds("An unexpected error occurred."));
        }
      });
  };
}

function messageAd(user_id, ad_id, message) {
  return function (dispatch) {
    dispatch(requestMessageAd());
    messageAd_ad(user_id, ad_id, message)
      .then((res) => {
        if(res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
        if (res.data) {
          dispatch(successMessageAd(res.data));
          message.success("Message sent successfully");
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureMessageAd(parsedError.message));
            message.error(err.message);
          }
        } catch {
          dispatch(failureMessageAd("An unexpected error occurred."));
        }
      });
  };
}

function closedAd(ad_id) {
  return function (dispatch) {
    dispatch(requestClosedAd());
    closeAd_ad(ad_id)
      .then((res) => {
        if(res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
        if (res.data) {
          dispatch(successClosedAd(res.data));
          message.success("Ad closed successfully");
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureClosedAd(parsedError.message));
            message.error(err.message);
          }
        } catch {
          dispatch(failureClosedAd("An unexpected error occurred."));
        }
      });
  };
}
