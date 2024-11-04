import {
  requestOpenUserForm,
  requestCloseUserForm,
} from "../reducers/modals.reducers";

export const modalActions = {
  openUserForm,
  closeUserForm,
};

function openUserForm() {
  return function (dispatch) {
    dispatch(requestOpenUserForm());
  };
}

function closeUserForm() {
  return function (dispatch) {
    dispatch(requestCloseUserForm());
  };
}
