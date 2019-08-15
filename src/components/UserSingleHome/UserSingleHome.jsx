import './UserSingleHome.scss'
import React, {PureComponent, Fragment, useRef} from 'react';

import SingleCell from "components/SingleCell/SingleCell";
import {Link} from "react-router-dom";

const UserSingleHome = (props) => {
    const {spanDates, user, getSpan, deleteSchedule, mouseDown, mouseEnter, mouseUp, replaceTask, onDrop, isSelectedCell, isUserSingle} = props;

    return (
        <Fragment>
            {spanDates.map((date, index) => <SingleCell key={user._id + date._id}
                                                        date={date}
                                                        getSpan={getSpan}
                                                        isUserSingle={isUserSingle}
                                                        deleteSchedule={deleteSchedule}
                                                        mouseDown={mouseDown}
                                                        mouseEnter={mouseEnter}
                                                        mouseUp={mouseUp}
                                                        replaceTask={replaceTask}
                                                        onDrop={onDrop}
                                                        user={user}
                                                        isSelectedCell={isSelectedCell}
            />)}
        </Fragment>
    )
};
export default UserSingleHome;