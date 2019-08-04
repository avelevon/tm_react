import {createAction} from "redux-actions";

export const loadStarted = createAction('[Targets] Load started');
export const loadCompleted = createAction('[Targets] Load completed');
export const loadFailed = createAction('[Targets] Load failed');

export const addStarted = createAction('[Targets] Add started');
export const addCompleted = createAction('[Targets] Add completed');
export const addFailed = createAction('[Targets] Add failed');

export const deleteCompleted = createAction('[Targets] Delete single target');

export const load = () => (dispatch, getState) => {
    dispatch(loadStarted());
    fetch(`http://localhost:3000/targets`)
        .then((response) => response.json())
        .then((targets) => {
            dispatch(loadCompleted(targets));
        })
        .catch((err) => {
            dispatch(loadFailed(err))
        });
};


export const add = (item) => (dispatch, getState) => {
    dispatch(addStarted());
    fetch(`http://localhost:3000/targets`,  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    })
        .then((response) => response.json())
        .then((target) => {
            dispatch(addCompleted(target));
        })
        .catch((err) => {
            dispatch(addFailed(err))
        });
};

export const deleteSingleItem = (id) => (dispatch, getState) => {
    fetch(`http://localhost:3000/targets`,  {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({_id: id}),
    })
        .then((response) => response.json())
        .then((targets) => {
            dispatch(deleteCompleted(targets));
        });
};