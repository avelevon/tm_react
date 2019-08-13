import './UserSingleHome.scss'
import React, {PureComponent, Fragment, useRef} from 'react';

import SingleCell from "components/SingleCell/SingleCell";

const UserSingleHome = (props) => {
    const {spanDates, user, getSpan, deleteSchedule, mouseDown, mouseEnter, mouseUp, replaceTask, onDrop, isSelectedCell} = props;

    return (
        <tr key={user._id} data-user={user._id}>
            <td className="names fixed">{user.name}</td>
            {spanDates.map((date, index) => <SingleCell key={user._id + date._id}
                                                        date={date}
                                                        getSpan={getSpan}
                                                        deleteSchedule={deleteSchedule}
                                                        mouseDown={mouseDown}
                                                        mouseEnter={mouseEnter}
                                                        mouseUp={mouseUp}
                                                        replaceTask={replaceTask}
                                                        onDrop={onDrop}
                                                        user={user}
                                                        isSelectedCell={isSelectedCell}
            /> )}
        </tr>
    )
};
export default UserSingleHome;