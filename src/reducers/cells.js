import {handleActions} from 'redux-actions';

import {resetCells, selectCell} from 'actions/cells';

const initialState = {

};

export default handleActions({
    [selectCell]: (state, action) => {

        state = {
            [action.payload.userId]: state[action.payload.userId] ? state[action.payload.userId] : [],
        };

        return {
            ...state,
            [action.payload.userId]: state[action.payload.userId].includes(action.payload.day) ? state[action.payload.userId].filter(day => day !== action.payload.day ) : state[action.payload.userId].concat(action.payload.day),
        }
    },
    [resetCells]: (state, action) => {
        return {

        }
    }
}, initialState)