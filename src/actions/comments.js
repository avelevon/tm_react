import { createAction } from 'redux-actions';

export const loadStarted = createAction('[Comments] Load started');
export const loadCompleted = createAction('[Comments] Load completed');
export const loadFailed = createAction('[Comments] Load failed');

export const load = () => (dispatch, getState) => {
    const state = getState();
    dispatch(loadStarted());
    fetch(`https://jsonplaceholder.typicode.com/comments?_limit=2&_page=${state.comments.page}`)
        .then((response) => response.json())
        .then((comments) => {
            dispatch(loadCompleted(comments));
        })
        .catch((err) => {
            dispatch(loadFailed(err));
        });
};

export const loadSingle = (item) => (dispatch) => {
    dispatch(loadCompleted(item))
};