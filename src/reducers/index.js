import { combineReducers } from 'redux';

import commentsReducer from './comments';
import usersReducer from './users';
import datesReducer from './dates';

export default combineReducers({
    comments: commentsReducer,
    users: usersReducer,
    dates: datesReducer
})