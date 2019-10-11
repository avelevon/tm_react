import {handleActions} from 'redux-actions';

import {loginUserStarted, loginUserCompleted, loginUserFailed, logoutUser} from 'actions/login';

const initialState = {
    user: {},
    token: '',
    error: '',
};

export default handleActions({
    [loginUserStarted]: (state, action) => {
        return {
            ...state,
        }
    },
    [loginUserCompleted]: (state, action) => {
        return {
            ...state,
            error: '',
            user: action.payload.user,
            token: action.payload.token
        }
    },
    [loginUserFailed]: (state, action) => {
        return {
            error: action.payload,
        }
    },
    [logoutUser]: (state, action) => {
        return initialState;
    }
}, initialState)