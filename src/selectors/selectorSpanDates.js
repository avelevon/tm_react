import { createSelectorCreator, defaultMemoize} from "reselect";
import isEqual from 'lodash/isEqual';

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
                            if (date.dayNumber === sch_day && sch_day - arr[i - 1] === 1) {
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