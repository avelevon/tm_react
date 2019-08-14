import {handleActions} from 'redux-actions';

import {
    loadStarted,
    loadCompleted,
    loadFailed,
    addStarted,
    addCompleted,
    addFailed,
} from 'actions/dates';

const initialState = {
    items: [],
    loading: true
};

export default handleActions({
    [loadStarted]: (state, actions) => {
        return {
            ...state,
            loading: true
        }
    },
    [loadCompleted]: (state, action) => {
        return {
            ...state,
            items: action.payload,
            loading: false
        }
    },
    [loadFailed]: (state, actions) => {
        return {
            ...state,
            loading: false
        }
    },
    [addStarted]: (state, action) => {
        return {
            ...state,
            loading: true
        }
    },
    [addCompleted]: (state, action) => {
        return {
            ...state,
            items: action.payload,
            loading: false
        }
    },
    [addFailed]: (state, action) => {
        return {
            ...state,
            loading: false
        }
    }
}, initialState)