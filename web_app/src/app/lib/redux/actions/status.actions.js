import { getAll_status } from "@/app/actions/status/getAll";
import {
  failureGetAll,
  requestGetAll,
  successGetAll,
} from "../reducers/status.reducers";
import { message } from "antd";
import { modalActions } from "./modals.actions";
import { userActions } from "./users.actions";

export const statusActions = {
  getAll
};

function getAll() {
  return function (dispatch) {
    dispatch(requestGetAll());
    getAll_status()
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
