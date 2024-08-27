import { userConstants } from "../constants/users.constants";
import { userServices } from "../services/users.services";

export const userActions = {
    login,
    register,
    logout
};

function login(email, password, cb1) {
    return function (dispatch) {
        dispatch(request());
        userServices
            .login(email, password)
            .then((res) => {
                dispatch(success(res.data));
                cb1();
            })
            .catch((err) => {
                dispatch(failure(err.response.data.message))
                dispatch(errorActions.getError(err.response.data.message));
            });
    };
    function request() {
        return {
            type: userConstants.LOGIN_USER_REQUEST,
        };
    }
    function success(user) {
        return {
            type: userConstants.LOGIN_USER_SUCCESS,
            payload: user,
        };
    }
    function failure(error) {
        return {
            type: userConstants.LOGIN_USER_FAILURE,
            payload: error,
        };
    }
}

function logout(cb) {
    window.localStorage.clear();
    cb();
    return {
        type: userConstants.LOGOUT_USER,
    };
}

function register(firstname, lastname, email, password, cb, currentDate) {
    return function (dispatch) {
        dispatch(request());
        userServices
            .register(firstname, lastname, email, password, currentDate)
            .then((res) => {
                dispatch(success(res.data));
                // dispatch(employerActions.getAuthEmployers(res.data.user.id));
                // dispatch(jobActions.getAuthJobs(res.data.user.id));
                // dispatch(shiftActions.getAll());
                // dispatch(shiftActions.authShift(res.data.user.id));
                cb();
            })
            .catch((err) => [dispatch(failure(err.message))]);
    };
    function request() {
        return {
            type: userConstants.REGISTER_USER_REQUEST,
        };
    }
    function success(user) {
        return {
            type: userConstants.REGISTER_USER_SUCCESS,
            payload: user,
        };
    }
    function failure(error) {
        return {
            type: userConstants.REGISTER_USER_FAILURE,
            payload: error,
        };
    }
}