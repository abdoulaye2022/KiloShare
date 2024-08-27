import { userConstants } from "../constants/users.constants";

const initialState = {
    loading: false,
    authenticathed: false,
    item: {},
    items: [],
    error: ""
};

export const user = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.LOGIN_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case userConstants.LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload.access_token,
                user: action.payload.user,
                authenticathed: true,
                error: "",
            };
        case userConstants.LOGIN_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                createdAccount: ''
            };
        case userConstants.REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case userConstants.REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case userConstants.REGISTER_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case userConstants.LOGOUT_USER:
            return {
                ...state,
                loading: false,
                authenticathed: false,
                user: {},
                items: [],
                token: "",
                error: "",
            };
        default:
            return state;
    }
};