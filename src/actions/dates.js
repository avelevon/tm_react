import {createAction} from "redux-actions";

export const loadStarted = createAction('[Dates] Load started');
export const loadCompleted = createAction('[Dates] Load completed');
export const loadFailed = createAction('[Dates] Load failed');

export const loadMoreStarted = createAction('[Dates] Load more started');
export const loadMoreCompleted = createAction('[Dates] Load more completed');
export const loadMoreFailed = createAction('[Dates] Load more failed');

export const loadScrollTriggerCompleted = createAction('[Dates] scroll trigger');

export const load = () => (dispatch, getState) => {
    dispatch(loadCompleted())
};

export const loadMore = (direction) => (dispatch, getState) => {
    dispatch(loadMoreCompleted(direction))
};

export const scrollToTodayTrigger = () =>( dispatch, getState) =>{
    dispatch(loadScrollTriggerCompleted())
}