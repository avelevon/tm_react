import {handleActions} from 'redux-actions';

import {
    loadStarted,
    loadCompleted,
    loadFailed,
    loadMoreStarted,
    loadMoreCompleted,
    loadMoreFailed,
    loadScrollTriggerCompleted,
} from 'actions/dates';
import moment from "moment";

const initialState = {
    items: [],
    start: 0,
    end: 0,
    loading: true,
    scrollTrigger: true,
};

export default handleActions({
    [loadStarted]: (state, actions) => {
        return {
            ...state,
            loading: true
        }
    },
    [loadCompleted]: (state, action) => {
        for (let i = -20; i < 21; i++) {
            state.items.push(moment().add(i, 'days').startOf('day'))
        }

        return {
            ...state,
            loading: false,
        }
    },
    [loadFailed]: (state, actions) => {
        return {
            ...state,
            loading: false
        }
    },
    [loadMoreStarted]: (state, actions) => {
        return {
            ...state,
            loading: true
        }
    },
    [loadMoreCompleted]: (state, action) => {
        const direction = action.payload;

        let arr = [];
        let dates = [];
        const first = state.items[0];
        const last = state.items[state.items.length - 1];
        if (direction === 'back') {
            for (let i = -20; i < 0; i++){
                arr.push(moment(first).add(i, 'days').startOf('day'))
            }
            dates = arr.concat(state.items);
        } else {
            for (let i = 1; i < 21; i++){
                arr.push(moment(last).add(i, 'days').startOf('day'))
            }
            dates = state.items.concat(arr);
        }
        return {
            ...state,
            items: dates,
            loading: false
        }
    },
    [loadMoreFailed]: (state, actions) => {
        return {
            ...state,
            loading: false
        }
    },
    [loadScrollTriggerCompleted]: (state, actions) => {
        return {
            ...state,
            scrollTrigger: !state.scrollTrigger,
        }
    },
}, initialState)