import {createAction} from 'redux-actions';

export const selectCell = createAction('[Cells] Select cell');
export const resetCells = createAction('[Cells] Reset cell');

export const select = (item) => (dispatch, getStates) => {
    dispatch(selectCell(item));
};

export const reset = () => (dispatch, getStates) => {
    dispatch(resetCells());
};