import {createAction} from "redux-actions";

export const scaleChangedWidth = createAction('[Scale] changed width');
export const scaleChangedHeight = createAction('[Scale] changed height');


export const changeWidth = (width) => (dispatch, getState) => {
    dispatch(scaleChangedWidth(width));
};

export const changeHeight = (height) => (dispatch, getState) => {
    dispatch(scaleChangedHeight(height));
};
