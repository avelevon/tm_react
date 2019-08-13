import './SingleCell.scss'
import React, {PureComponent, Fragment, useRef} from 'react';
import classNames from 'classnames';
import {add as addTask} from 'actions/schedules';
import {useDrag, useDrop} from "react-dnd";
import ItemTypes from "../../ItemTypes";

const SingleCell = (props) => {
    const {date, user, getSpan, deleteSchedule, mouseDown, mouseEnter, mouseUp, replaceTask, isSelectedCell} = props;

    const ref = useRef(null);

    let newSchedule = {

    };

    const [{isOver}, drop] = useDrop({
        accept: ItemTypes.SCHEDULE,
        drop(item){
            newSchedule = {
                ...newSchedule,
                userId: ref.current.parentElement.getAttribute('data-user'),
                days: [+ref.current.getAttribute('data-day')],
                scheduleId: item.id,
                targetId: item.targetId,
            };
            for (let i = 1; i < item.span; i++) {
                newSchedule.days.push(newSchedule.days[0] + i);
            }

            replaceTask(newSchedule);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        })
    });

    const [{isDragging}, drag] = useDrag({
        item: {
            user: user,
            span: getSpan(date.dayNumber, user._id).span,
            id: getSpan(date.dayNumber, user._id).scheduleId,
            targetId: getSpan(date.dayNumber, user._id).target._id,
            type: ItemTypes.SCHEDULE,
        },
        begin() {

        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        })
    });


    getSpan(date.dayNumber, user._id).active ? drag(ref) : drop(ref) ;


    let tdClasses = classNames({
        'over-class': isOver,
        'active': isSelectedCell(user._id, date.dayNumber),
    });

    return (
        getSpan(date.dayNumber, user._id).active ?
            <td colSpan={getSpan(date.dayNumber, user._id).span}
                data-day={date.dayNumber}
                className={'active-schedule'}
                key={user._id + date._id}
                ref={ref}
            >
                {getSpan(date.dayNumber, user._id).target.sn}
                {getSpan(date.dayNumber, user._id).target.name}
                {getSpan(date.dayNumber, user._id).target.address}
                <span className="delete-schedule"
                      onClick={() => deleteSchedule(getSpan(date.dayNumber, user._id).scheduleId)}>DEL</span>
            </td>
            :
            <td onMouseDown={(event) => mouseDown(user._id, event)}
                onMouseEnter={(event) => mouseEnter(user._id, event)}
                onMouseUp={(event) => mouseUp(user._id, event)}
                data-day={date.dayNumber}
                key={user._id + date._id}
                ref={ref}
                className={tdClasses}
            > </td>
    )
};
export default SingleCell;