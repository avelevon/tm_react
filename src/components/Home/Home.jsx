import './Home.scss'
import React, {PureComponent} from 'react';

export default class Home extends PureComponent {
    constructor(props) {
        super(props);

    }

    render() {
        const {dates, monthsSpan, weeksSpan, users, getSpan, deleteSchedule, getRef, mouseDown, mouseEnter, mouseUp } = this.props;

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
                        {dates.map((date) => <td key={date._id}>{date.day} {date.weekDay} </td>)}
                    </tr>

                    {users.map((user) => <tr key={user._id}>
                        <td className="names fixed">{user.name}</td>
                        {dates.map((date, index) => <td colSpan={getSpan(index, user._id).span}
                                                        onMouseDown={mouseDown}
                                                        onMouseEnter={mouseEnter}
                                                        onMouseUp={(event) => mouseUp(user._id, event)}
                                                        data-day={date.dayNumber}
                                                        ref={getSpan(index, user._id).active ? getRef : ''}
                                                        className={getSpan(index, user._id).active ? 'active-schedule' : ''}
                                                        key={date._id}  > {getSpan(index, user._id).target.sn} {getSpan(index, user._id).target.name} {getSpan(index, user._id).target.address}
                            {getSpan(index, user._id).active ? <span className="delete-schedule" onClick={() => deleteSchedule(getSpan(index, user._id).scheduleId)}>DEL</span> : ''} </td>)}
                    </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}
