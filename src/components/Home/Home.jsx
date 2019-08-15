import './Home.scss'
import React, {PureComponent} from 'react';
import UserSingleHome from "components/UserSingleHome";
import Calendar from "components/Calendar";
import {Link} from "react-router-dom";


export default class Home extends PureComponent {

    render() {
        const {dates, spanDates, monthsSpan, weeksSpan, users, getSpan, deleteSchedule, mouseDown, mouseEnter, mouseUp, replaceTask, isSelectedCell, isUserSingle} = this.props;

        return (
            <div className="Home">
                <table>
                    <tbody>
                    <Calendar dates={dates} monthsSpan={monthsSpan} weeksSpan={weeksSpan}/>

                    {users.map((user) =>
                        <tr data-user={user._id}>
                            <td className="names fixed"><Link to={`/users/${user._id}`}>{user.name}</Link></td>
                        <UserSingleHome replaceTask={replaceTask} key={user._id} spanDates={spanDates.find(spanDate => {
                            return spanDate.userId === user._id
                        }).dates} user={user}
                                        getSpan={getSpan}
                                        deleteSchedule={deleteSchedule}
                                        mouseDown={mouseDown}
                                        mouseEnter={mouseEnter}
                                        mouseUp={mouseUp}
                                        isSelectedCell={isSelectedCell}
                                        isUserSingle={isUserSingle}
                        />
                        </tr>
                        )}

                    </tbody>
                </table>
            </div>
        )
    }
}
