import { failureAdd, failureGetAll, requestAdd, requestGetAll, successAdd, successGetAll } from "../reducers/ads.reducers";
import { adServices } from "../services/ads.services";
import { modalActions } from "./modals.actions";

export const adActions = {
  add,
  getAll
};

function getAll() {
    return function (dispatch) {
      dispatch(requestGetAll());
      adServices
        .api_getAll()
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
    adServices
      .api_add(data)
      .then((res) => {
        dispatch(successAdd(res.data));
        dispatch(modalActions.openAdApprovalNotice());
      })
      .catch((err) => {
        dispatch(failureAdd(err.message));
      });
  };
}
