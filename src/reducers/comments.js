import { handleActions } from 'redux-actions';

import { loadStarted, loadCompleted, loadFailed } from 'actions/comments';

const initialState = {
    items: [],
    loading: false,
    page: 1,
};

export default handleActions({
    [loadStarted]: (state, action) => {
        return {
            ...state,
            loading: true,
        }
    },

    [loadCompleted]: (state, action) => {
        return {
            ...state,
            loading: false,
            items: state.items.concat(action.payload),
            page: state.page + 1,
        }
    },

    [loadFailed]: (state, action) => {
        return {
            ...state,
            loading: false,
        }
    }
}, initialState)