import {handleActions} from 'redux-actions';

import {
    loadStarted,
    loadCompleted,
    loadFailed,
    loadUserStarted,
    loadUserCompleted,
    loadUserFailed,
    addStarted,
    addCompleted,
    addFailed, deleteCompleted,
} from 'actions/users';

const initialState = {
    items: [],
    singleUser: {},
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
    [loadUserStarted]: (state, actions) => {
        return {
            ...state,
            loading: true
        }
    },
    [loadUserCompleted]: (state, action) => {
        return {
            ...state,
            singleUser: action.payload,
            loading: false
        }
    },
    [loadUserFailed]: (state, actions) => {
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
            items: state.items.find(user => user._id === action.payload.user._id) ? state.items.map(user => user._id === action.payload.user._id ? action.payload.user : user) : state.items.concat(action.payload.user),
            loading: false
        }
    },
    [addFailed]: (state, action) => {
        return {
            ...state,
            loading: false
        }
    },
    [deleteCompleted]: (state, action) => {
        return {
            ...state,
            items: action.payload,
            loading: false
        }
    }

}, initialState)