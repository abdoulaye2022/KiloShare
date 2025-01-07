import {
    requestSendContact,
    successSendContact,
    failureSendContact,
    resetSuccess
} from "../reducers/contacts.reducers";
import { contact_team } from "@/app/actions/contact/contact";

export const contactActions = {
  sendContact,
  resetSuccess
};

function sendContact(name, email, subject, message, recaptcha) {
  return function (dispatch) {
    dispatch(requestSendContact());
    contact_team(name, email, subject, message, recaptcha)
      .then((res) => {
        if(res.status === 401) {
          dispatch(modalActions.openSessionExpired());
        }
        if (res.data) {
          dispatch(successSendContact(res.data));
        } else {
          throw new Error(JSON.stringify(res));
        }
      })
      .catch((err) => {
        try {
          if (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(failureSendContact(parsedError.message));
          }
        } catch {
          dispatch(failureSendContact("An unexpected error occurred."));
        }
      });
  };
}
