import {createSelector} from "reselect";

const getDates = state => state.dates.items;
const getSchedules = state => state.schedules.items;
const getUsers = state => state.users.items;

const getSpanDates = createSelector(
    [getDates, getSchedules, getUsers], (dates, schedules, users) => {
        let newDates = [];
        users.map((user, index) => {
            newDates.push({
                userId: user._id,
                dates: dates,
            });
            schedules.map(schedule => {
                if (user._id === schedule.userId) {
                    newDates[index].dates = newDates[index].dates.filter((date, index) => {
                        let flag = true;
                        schedule.days.forEach((sch_day, i, arr) => {
                            if (date.dayNumber === sch_day && sch_day - arr[i-1] === 1) {
                                flag = false;
                            }
                        });
                        return flag;
                    })
                }
            });
        });
        return newDates;
    }
);

export default getSpanDates;