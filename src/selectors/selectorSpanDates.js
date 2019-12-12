import { createSelectorCreator, defaultMemoize} from "reselect";
import isEqual from 'lodash/isEqual';
import moment from 'moment';

const getDates = (state, props) => state.dates.items;
const getSchedules = (state, props) => state.schedules.items.filter(schedule => props.user._id === schedule.userId);
const getUser = (state, props) => props.user;

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const makeGetSpanDates = () => {
    return createDeepEqualSelector(
        [getDates, getSchedules, getUser], (dates, schedules, user) => {
            let newDates = {
                userId: user._id,
                dates: dates
            };
            // console.log('getSpan: recalculating')
            schedules.map(schedule => {
                if (user._id === schedule.userId) {

                    newDates.dates = newDates.dates.filter((date, index) => {
                        let flag = true;

                        schedule.days.forEach((sch_day, i, arr) => {
                            if (moment(sch_day).isSame(date, 'day') && moment(sch_day).subtract(1, 'days').isSame(moment( arr[i - 1] ))) {
                                flag = false;
                            }
                        });
                        return flag;
                    })
                }
            });

            return newDates;
        })
};

export default makeGetSpanDates;