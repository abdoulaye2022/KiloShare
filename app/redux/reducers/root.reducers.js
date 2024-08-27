import { combineReducers } from 'redux';
import { user } from './users.reducers';

const appReducers = combineReducers({
    user
})

const rootReducers = (state, action) => {
    // if(action.type === "LOGOUT_USER") {
    //     storage.removeItem('persist:root');

    //     return appReducers(undefined, action)
    // }
    return appReducers(state, action);
}

export default rootReducers;