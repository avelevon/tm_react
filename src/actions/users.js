import {createAction} from "redux-actions";

export const loadStarted = createAction('[Users] Load started');
export const loadCompleted = createAction('[Users] Load completed');
export const loadFailed = createAction('[Users] Load failed');

export const addStarted = createAction('[Users] Add started');
export const addCompleted = createAction('[Users] Add completed');
export const addFailed = createAction('[Users] Add failed');

export const deleteCompleted = createAction('[User] Delete single user');

export const load = () => (dispatch, getState) => {
    dispatch(loadStarted());
    fetch(`http://${document.domain}:3000/users`)
        .then((response) => response.json())
        .then((users) => {
            dispatch(loadCompleted(users));
        })
        .catch((err) => {
            dispatch(loadFailed(err))
        });
};


export const add = (item) => (dispatch, getState) => {
    dispatch(addStarted());
    fetch(`http://${document.domain}:3000/users`,  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    })
        .then((response) => response.json())
        .then((user) => {
            dispatch(addCompleted(user));
        })
        .catch((err) => {
            dispatch(addFailed(err))
        });
};

export const deleteSingleUser = (id) => (dispatch, getState) => {
    fetch(`http://${document.domain}:3000/users`,  {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({_id: id}),
    })
        .then((response) => response.json())
        .then((users) => {
            dispatch(deleteCompleted(users));
        });
};