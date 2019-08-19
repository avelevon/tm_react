import {createSelector} from "reselect";

const getDates = (state, props) => state.dates.items;
const getSchedules = (state, props) => state.schedules.items;
const getUser = (state, props) => props.user;

const makeGetSpanDates = () => {
    return createSelector(
        [getDates, getSchedules, getUser], (dates, schedules, user) => {
            let newDates = {
                userId: user._id,
                dates: dates
            };
            console.log('getSpan: recalculating')
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

// const getSpanDates = createSelector(
//     [getDates, getSchedules, getUsers], (dates, schedules, users) => {
//         let newDates = [];
//         users.map((user, index) => {
//             newDates.push({
//                 userId: user._id,
//                 dates: dates,
//             });
//             schedules.map(schedule => {
//                 if (user._id === schedule.userId) {
//                     newDates[index].dates = newDates[index].dates.filter((date, index) => {
//                         let flag = true;
//                         schedule.days.forEach((sch_day, i, arr) => {
//                             if (date.dayNumber === sch_day && sch_day - arr[i-1] === 1) {
//                                 flag = false;
//                             }
//                         });
//                         return flag;
//                     })
//                 }
//             });
//         });
//         return newDates;
//     }
// );

export default makeGetSpanDates;