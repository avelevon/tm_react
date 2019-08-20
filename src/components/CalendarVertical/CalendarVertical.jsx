import './CalendarVertical.scss'
import React, {Fragment, PureComponent, forwardRef} from 'react';
import classNames from "classnames";

const CalendarVertical = forwardRef((props, todayRef) => {
        const {monthsSpan, weeksSpan, date, children, getToday} = props;

        let tdClasses = (date) => classNames({
            'today': date.dayNumber === getToday(),
            'weekend': date.weekDay === 'Sa' || date.weekDay === 'Su',
        });

        return (
            <Fragment>
                    {monthsSpan.months.find(item => item.month === date.month) && date.day === 1 ? <td className="months"
                                                                key={date.month + date._id}
                                                                rowSpan={monthsSpan.daysInMonth[monthsSpan.months.findIndex(item => item.month === date.month)]}>
                        <div>{date.month}</div>

                    </td> : null}
                    {weeksSpan.weeks.find(item => item.weekNumber === date.weekNumber) &&
                    date.day ===  weeksSpan.weeks[weeksSpan.weeks.findIndex(item => item.weekNumber === date.weekNumber )].day ?
                                                              <td className="weeks"
                                                              key={date.weekNumber + date._id}
                                                              rowSpan={weeksSpan.daysInWeek[weeksSpan.weeks.findIndex(item => item.weekNumber === date.weekNumber )]}>{date.weekNumber}</td> : null}
                    <td
                        className={tdClasses(date)}
                        ref={getToday() === date.dayNumber ? todayRef : null}
                        data-day={date.dayNumber}
                        >
                        {date.day} {date.weekDay} </td>

                    {children}

            </Fragment>
        )

})

export default CalendarVertical;