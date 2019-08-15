import './CalendarVertical.scss'
import React, {Fragment, PureComponent} from 'react';
import classNames from "classnames";

export default class CalendarVertical extends PureComponent {
    constructor(props) {
        super(props);
        this.todayRef = React.createRef();
    }


    componentDidMount() {
        this.scrollToToday();
    }

    getToday = () => {
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth();
        let currentDay = currentDate.getDate();
        let today = 0;
        for (let i = 0; i <= currentMonth; i++) {
            let daysInMonth = new Date(year, i + 1, 0);
            let upToDay = currentMonth === i ? currentDay : daysInMonth.getDate();
            for (let j = 1; j <= upToDay; j++) {
                today++;
            }
        }
        return today;
    };

    scrollToToday = () => {
        if (this.todayRef.current) {
            window.scrollTo(0, this.todayRef.current.offsetTop - 200)
        }
    };

    render() {
        const {monthsSpan, weeksSpan, date, children} = this.props;

        let tdClasses = (date) => classNames({
            'today': date.dayNumber === this.getToday(),
            'weekend': date.weekDay === 'Sa' || date.weekDay === 'Su',
        });

        return (
            <Fragment>

                    {monthsSpan.months.find(item => item.month === date.month) && date.day === 1 ? <td className="months"
                                                                key={date.month + date._id}
                                                                rowSpan={monthsSpan.daysInMonth[monthsSpan.months.findIndex(item => item.month === date.month)]}>
                        {date.month}

                    </td> : null}
                    {weeksSpan.weeks.find(item => item.weekNumber === date.weekNumber) &&
                    date.day ===  weeksSpan.weeks[weeksSpan.weeks.findIndex(item => item.weekNumber === date.weekNumber )].day ?
                                                              <td className="weeks"
                                                              key={date.weekNumber + date._id}
                                                              rowSpan={weeksSpan.daysInWeek[weeksSpan.weeks.findIndex(item => item.weekNumber === date.weekNumber )]}>{date.weekNumber}</td> : null}
                    <td
                        className={tdClasses(date)}
                        ref={this.getToday() === date.dayNumber ? this.todayRef : null}
                        data-day={date.dayNumber}
                        >
                        {date.day} {date.weekDay} </td>

                    {children}

            </Fragment>
        )
    }
}