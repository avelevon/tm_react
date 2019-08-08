import './UserSingleHome.scss'
import React, {PureComponent, Fragment} from 'react';

export default class UserSingleHome extends PureComponent {

    render() {
        const {spanDates, user, getSpan, deleteSchedule, mouseDown, mouseEnter, mouseUp} = this.props;
        return (
            <Fragment>
                 <tr key={user._id}>
                    <td className="names fixed">{user.name}</td>
                    {spanDates.map((date, index) => <td colSpan={getSpan(date.dayNumber, user._id).span}
                                                         onMouseDown={(event) => mouseDown(user._id, event)}
                                                         onMouseEnter={(event) => mouseEnter(user._id, event)}
                                                         onMouseUp={(event) => mouseUp(user._id, event)}
                                                         data-day={date.dayNumber}
                                                         className={getSpan(date.dayNumber, user._id).active ? 'active-schedule' : ''}
                                                         key={user._id + date._id}> {getSpan(date.dayNumber, user._id).target.sn} {getSpan(date.dayNumber, user._id).target.name} {getSpan(date.dayNumber, user._id).target.address}
                        {getSpan(date.dayNumber, user._id).active ? <span className="delete-schedule"
                                                                             onClick={() => deleteSchedule(getSpan(date.dayNumber, user._id).scheduleId)}>DEL</span> : ''} </td>)}
                </tr>
            </Fragment>
        )
    }
}