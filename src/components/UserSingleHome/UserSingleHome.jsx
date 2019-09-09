import './UserSingleHome.scss'
import React, {PureComponent, Fragment, useRef} from 'react';

import SingleCell from "components/SingleCell/SingleCell";
import makeGetSpanDates from "selectors/selectorSpanDates";
import {connect} from "react-redux";

const UserSingleHome = (props) => {
    const {spanDates, user, getSpan, deleteSchedule, mouseDown, mouseEnter, mouseUp, replaceTask, onDrop, isSelectedCell, isUserSingle, ctrlFlag, addTask} = props;

    return (
        <Fragment>
            {spanDates.dates.map((date, index) => <SingleCell key={user._id + date._id}
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
                                                              ctrlFlag={ctrlFlag}
                                                              addTask={addTask}
            />)}
        </Fragment>
    )
};

const makeMapStateToProps = () => {
    const getSpanDates = makeGetSpanDates();
    const mapStateToProps = (state, props) => {
        return {
            spanDates: getSpanDates(state, props),
        }
    };
    return mapStateToProps;
};

export default connect(makeMapStateToProps)(UserSingleHome);