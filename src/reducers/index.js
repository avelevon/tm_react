import { combineReducers } from 'redux';

import usersReducer from './users';
import datesReducer from './dates';
import targetsReducer from './targets';
import schedulesReducer from './schedules';
import cellsReducer from './cells';

export default combineReducers({
    schedules: schedulesReducer,
    targets: targetsReducer,
    users: usersReducer,
    dates: datesReducer,
    cells: cellsReducer,
})