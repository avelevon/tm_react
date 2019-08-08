import {createSelector} from "reselect";

const getDates = (state) => state.dates.items;

const getWeekSpan = createSelector(
    [getDates], (dates) => {
        let daysNumberInWeek = [];
        let counter = -1;
        let weeks = dates.filter((date, i, arr) => {
            counter++;
            if (i > 0) {
                if (date.weekNumber === arr[i - 1].weekNumber) {
                    return false;
                } else {
                    daysNumberInWeek.push(counter);
                    counter = 0;
                    return true;
                }
            } else {
                return true;
            }
        });
        daysNumberInWeek.push(3);

        return {
            weeks: weeks,
            daysInWeek: daysNumberInWeek,
        }
    }
);

export default getWeekSpan;