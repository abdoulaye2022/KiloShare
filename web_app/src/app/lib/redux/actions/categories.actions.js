import {
  failureGetAll,
  requestGetAll,
  successGetAll,
} from "../reducers/categories.reducers";
import { categoryServices } from "../services/categories.services";

export const categoryActions = {
  getAll,
};

function getAll() {
  return function (dispatch) {
    dispatch(requestGetAll());
    categoryServices
      .api_getAll()
      .then((res) => {
        console.log("Abdoulaye")
        console.log(res.data);
        dispatch(successGetAll(res.data));
      })
      .catch((err) => {
        dispatch(failureGetAll(err.message));
      });
  };
}
