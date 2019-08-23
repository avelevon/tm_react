import './Calendar.scss'
import React, {forwardRef, Fragment, PureComponent} from 'react';
import classNames from "classnames";

const Calendar = forwardRef((props, todayRef) => {
    const {monthsSpan, weeksSpan, dates, getToday } = props;

    let tdClasses = (date) => classNames({
        'today': date.dayNumber === getToday(),
        'weekend': date.weekDay === 'Sa' || date.weekDay === 'Su',
    });

    return (
        <Fragment>
            <tr className="months">
                <td className="names-title fixed" rowSpan="3">Names</td>
                <td className="empty-cell"> </td>
                {monthsSpan.months.map((item, index) => <td key={item.month}
                                                            colSpan={monthsSpan.daysInMonth[index]}>{item.month}</td>)}
            </tr>
            <tr className="weeks">
                <td className="hidden fixed" rowSpan="3"></td>
                <td className="empty-cell"> </td>
                {weeksSpan.weeks.map((item, index) => <td key={item.weekNumber}
                                                          colSpan={weeksSpan.daysInWeek[index]}>{item.weekNumber}</td>)}
            </tr>
            <tr className="days">
                <td className="hidden fixed" rowSpan="3"></td>
                <td className="empty-cell"> </td>
                {dates.map((date) => <td className={tdClasses(date)}
                                         ref={getToday() === date.dayNumber ? todayRef : null}
                                         data-day={date.dayNumber}
                                         key={date._id}>{date.day} {date.weekDay} </td>)}
            </tr>
        </Fragment>
    )
})

export default Calendar;