import {createAction} from "redux-actions";

export const loadStarted = createAction('[Dates] Load started');
export const loadCompleted = createAction('[Dates] Load completed');
export const loadFailed = createAction('[Dates] Load failed');

export const addStarted = createAction('[Dates] Add started');
export const addCompleted = createAction('[Dates] Add completed');
export const addFailed = createAction('[Dates] Add failed');

export const load = () => (dispatch, getState) => {
    dispatch(loadStarted());
    fetch(`http://localhost:3000/dates`)
        .then((response) => response.json())
        .then((dates) => {
            dispatch(loadCompleted(dates));
        })
        .catch((err) => {
            dispatch(loadFailed(err))
        });
};

export const add = (dates) => (dispatch, getState) => {
    dispatch(addStarted());
    fetch(`http://localhost:3000/dates`,  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dates),
    })
        .then((response) => response.json())
        .then((dates) => {
            dispatch(addCompleted(dates));
        })
        .catch((err) => {
            dispatch(addFailed(err))
        });
};