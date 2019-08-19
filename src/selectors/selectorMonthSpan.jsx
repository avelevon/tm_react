import {createSelector} from "reselect";

const getDates = (state) => state.dates.items;

const getMonthSpan = createSelector(
    [getDates], (dates) => {
        let daysNumberInMonth = [];
        let counter = -1;
        let months = dates.filter((date, i, arr) => {
            counter++;
            if (i > 0) {
                if (date.month === arr[i - 1].month) {
                    return false;
                } else {
                    daysNumberInMonth.push(counter);
                    counter = 0;
                    return true;
                }
            } else {
                return true;
            }
        });
        daysNumberInMonth.push(31);

        return {
            months: months,
            daysInMonth: daysNumberInMonth,
        }
    }
);

export default getMonthSpan;