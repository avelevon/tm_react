import {handleActions} from 'redux-actions';

import {scaleChangedWidth, scaleChangedHeight} from 'actions/scale';


const initialState = {
    width: 60,
    height: 60,
};

export default handleActions({
    [scaleChangedWidth]: (state, action) => {
        return {
            ...state,
            width: action.payload,
        }
    },
    [scaleChangedHeight]: (state, action) => {
        return {
            ...state,
            height: action.payload,
        }
    },
}, initialState)