import './Home.scss'
import React, {PureComponent} from 'react';

export default class Home extends PureComponent {
    static defaultProps = {}

    clickCell = (event) => {
        event.target.classList.toggle('active');

    };


    render() {
        const {dates, monthsSpan, weeksSpan, users, clickCell} = this.props;
        return (
            <div className="Home">
                <table>
                    <tbody>
                    <tr className="months">
                        <td className="names-title fixed" rowSpan="3">Names</td>
                        {monthsSpan.months.map((item, index) => <td key={item.month} colSpan={monthsSpan.daysInMonth[index]}>{item.month}</td>)}
                    </tr>
                    <tr className="weeks">
                        <td className="hidden fixed" rowSpan="3"></td>
                        {weeksSpan.weeks.map((item, index) => <td key={item.weekNumber} colSpan={weeksSpan.daysInWeek[index]}>{item.weekNumber}</td>)}
                    </tr>
                    <tr className="days">
                        <td className="hidden fixed" rowSpan="3"></td>
                        {dates.map((date) => <td key={date._id}>{date.day} {date.weekDay} </td>)}
                    </tr>

                    {users.map((user) => <tr key={user._id}>
                        <td className="names fixed">{user.name}</td>
                        {dates.map((date) => <td  key={date._id} onClick={this.clickCell}>  </td>)}
                    </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}
