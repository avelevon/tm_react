import {createAction} from "redux-actions";

export const loadStarted = createAction('[Schedules] Load started');
export const loadCompleted = createAction('[Schedules] Load completed');
export const loadFailed = createAction('[Schedules] Load failed');

export const addStarted = createAction('[Schedules] Add started');
export const addCompleted = createAction('[Schedules] Add completed');
export const addFailed = createAction('[Schedules] Add failed');

export const replaceStarted = createAction('[Schedules] Replace started');
export const replaceCompleted = createAction('[Schedules] Replace completed');
export const replaceFailed = createAction('[Schedules] Replace failed');

export const deleteCompleted = createAction('[schedules] Delete single schedule');

export const load = () => (dispatch, getState) => {
    dispatch(loadStarted());
    fetch(`http://localhost:3000/schedules`)
        .then((response) => response.json())
        .then((schedules) => {
            dispatch(loadCompleted(schedules));
        })
        .catch((err) => {
            dispatch(loadFailed(err))
        });
};


export const add = (item) => (dispatch, getState) => {
    dispatch(addStarted());
    fetch(`http://localhost:3000/schedules`,  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    })
        .then((response) => response.json())
        .then((schedule) => {
            dispatch(addCompleted(schedule));
        })
        .catch((err) => {
            dispatch(addFailed(err))
        });
};

export const replace = (item) => (dispatch, getState) => {
    dispatch(replaceStarted());
    fetch(`http://localhost:3000/schedules`,  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    })
        .then((response) => response.json())
        .then((schedule) => {
            dispatch(replaceCompleted(schedule));
        })
        .catch((err) => {
            dispatch(replaceFailed(err))
        });
};

export const deleteSingleItem = (id) => (dispatch, getState) => {
    fetch(`http://localhost:3000/schedules`,  {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({_id: id}),
    })
        .then((response) => response.json())
        .then((schedules) => {
            dispatch(deleteCompleted(schedules));
        });
};