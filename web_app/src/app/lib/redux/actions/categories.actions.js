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
        dispatch(successGetAll(res.data));
      })
      .catch((err) => {
        dispatch(failureGetAll(err.message));
      });
  };
}
