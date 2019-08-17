import './SingleUserTasks.scss'
import React, {Fragment, PureComponent} from 'react';
import UserSingleHome from "components/UserSingleHome";
import classNames from "classnames";
import {Link} from "react-router-dom";
import SingleCell from "components/SingleCell/SingleCell";
import CalendarVertical from "components/CalendarVertical";

export default class SingleUserTasks extends PureComponent {

    render() {
        const {dates, spanDates, monthsSpan, weeksSpan, user, getSpan, deleteSchedule, mouseDown, mouseEnter, mouseUp, replaceTask, isSelectedCell, isUserSingle} = this.props;

        const spanDatesToUser = spanDates.find(spanDates => spanDates.userId === user._id).dates;

        if (true) {
            return (
                <div className="SingleUserTasks">
                    <table>
                        <tbody>
                        {dates.map((date, index) => <tr key={date._id}>
                            <CalendarVertical date={date} monthsSpan={monthsSpan} weeksSpan={weeksSpan}>
                                {spanDatesToUser.find(item => item.dayNumber === date.dayNumber) ? <SingleCell replaceTask={replaceTask}
                                                                                                         date={date}
                                                                                                         spanDates={spanDates}
                                                                                                         user={user}
                                                                                                         getSpan={getSpan}
                                                                                                         deleteSchedule={deleteSchedule}
                                                                                                         mouseDown={mouseDown}
                                                                                                         mouseEnter={mouseEnter}
                                                                                                         mouseUp={mouseUp}
                                                                                                         isSelectedCell={isSelectedCell}
                                                                                                         isUserSingle={isUserSingle}
                                /> : null}
                            </CalendarVertical>
                        </tr>)}
                        </tbody>
                    </table>

                </div>
            )

        } else {
            return (
                <div className="SingleUserTasks">
                    <div>{user.name}</div>
                    {schedules.map(schedule => <ul key={schedule._id}>
                        <li>{'Dates: '}{dates.find(date => date.dayNumber === schedule.days[0]).day} {dates.find(date => date.dayNumber === schedule.days[0]).month}
                            {' - '}{dates.find(date => date.dayNumber === schedule.days[schedule.days.length - 1]).day} {dates.find(date => date.dayNumber === schedule.days[schedule.days.length - 1]).month}</li>
                        <li>{'Target: '}{targets.find(target => schedule.targetId === target._id).sn} {targets.find(target => schedule.targetId === target._id).name} {targets.find(target => schedule.targetId === target._id).address}</li>
                    </ul>)}
                </div>
            )
        }
    }
}