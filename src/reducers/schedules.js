import {handleActions} from 'redux-actions';

import {
    loadStarted,
    loadCompleted,
    loadFailed,
    addStarted,
    addCompleted,
    replaceStarted,
    replaceCompleted,
    replaceFailed,
    addFailed, deleteCompleted,
} from 'actions/schedules';

const initialState = {
    items: [],
    loading: false
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
            items: state.items.concat(action.payload),
            loading: false
        }
    },
    [addFailed]: (state, action) => {
        return {
            ...state,
            loading: false
        }
    },
    [replaceStarted]: (state, action) => {
        return {
            ...state,
            loading: true
        }
    },
    [replaceCompleted]: (state, action) => {
        state = {
            ...state,
            items: state.items.filter((item) => {return item._id !== action.payload[0]._id})
        };

        return {
            ...state,
            items: state.items.concat(action.payload),
            loading: false
        }
    },
    [replaceFailed]: (state, action) => {
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