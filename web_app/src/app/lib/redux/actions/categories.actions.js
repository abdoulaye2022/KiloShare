import { getAll_categories } from "@/app/actions/categories/getApp";
import {
  failureGetAll,
  requestGetAll,
  successGetAll,
} from "../reducers/categories.reducers";

export const categoryActions = {
  getAll,
};

function getAll() {
  return function (dispatch) {
    dispatch(requestGetAll());
    getAll_categories()
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
