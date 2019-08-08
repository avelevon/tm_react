import './Home.scss'
import React, {PureComponent} from 'react';
import UserSingleHome from "components/UserSingleHome";

export default class Home extends PureComponent {
    constructor(props) {
        super(props);
    }

    getToday = (year) => {
        let currentDate = new Date();
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

    render() {
        const {dates, spanDates, monthsSpan, weeksSpan, users, getSpan, deleteSchedule, mouseDown, mouseEnter, mouseUp} = this.props;
        return (
            <div className="Home">
                <table>
                    <tbody>
                    <tr className="months">
                        <td className="names-title fixed" rowSpan="3">Names</td>
                        {monthsSpan.months.map((item, index) => <td key={item.month}
                                                                    colSpan={monthsSpan.daysInMonth[index]}>{item.month}</td>)}
                    </tr>
                    <tr className="weeks">
                        <td className="hidden fixed" rowSpan="3"></td>
                        {weeksSpan.weeks.map((item, index) => <td key={item.weekNumber}
                                                                  colSpan={weeksSpan.daysInWeek[index]}>{item.weekNumber}</td>)}
                    </tr>
                    <tr className="days">
                        <td className="hidden fixed" rowSpan="3"></td>
                        {dates.map((date) => <td className={date.dayNumber === this.getToday(2019) ? 'today' : ''}
                                                data-day={date.dayNumber}
                                                 key={date._id}>{date.day} {date.weekDay} </td>)}
                    </tr>
                    {users.map((user) =>
                        <UserSingleHome key={user._id} spanDates={spanDates.find(spanDate => {
                            return spanDate.userId === user._id
                        }).dates} user={user} getSpan={getSpan} deleteSchedule={deleteSchedule} mouseDown={mouseDown}
                                        mouseEnter={mouseEnter} mouseUp={mouseUp}/>
                    )}

                    </tbody>
                </table>
            </div>
        )
    }
}
