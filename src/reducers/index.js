import { combineReducers } from 'redux';

import usersReducer from './users';
import datesReducer from './dates';
import targetsReducer from './targets';
import schedulesReducer from './schedules';

export default combineReducers({
    schedules: schedulesReducer,
    targets: targetsReducer,
    users: usersReducer,
    dates: datesReducer
})