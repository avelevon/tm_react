import './SingleCell.scss'
import React, {PureComponent, Fragment, useRef, useEffect} from 'react';
import classNames from 'classnames';

const SingleCell = (props) => {
    const {date, user, getSpan, deleteSchedule, mouseDown, mouseEnter, mouseUp, replaceTask, isSelectedCell, isUserSingle, ctrlFlag, addTask} = props;

    const ref = useRef(null);

    let newSchedule = {};
    let canDrop = true;

    const onDragStartHandler = (event, span, scheduleId, targetId) => {
        event.dataTransfer.setData('text', span + ':' + scheduleId + ':' +  targetId);
        event.target.parentElement.parentElement.setAttribute('data-taskSpan', span);
        event.target.parentElement.parentElement.setAttribute('data-taskId', scheduleId);
        event.target.classList.add('task-opacity');
    };

    const onDragEndHandler = (event) => {
        event.target.parentElement.parentElement.setAttribute('data-taskSpan', '0');
        event.target.parentElement.parentElement.setAttribute('data-taskId', '0');
        event.target.classList.remove('task-opacity');
    };

    const onDragOverHandler = (event) => {
        canDrop ? event.preventDefault() : null;
        if (!event.target.classList.contains('over-class')) {
            event.target.classList.add('over-class');
            let taskSpan = +event.target.parentElement.parentElement.getAttribute('data-taskSpan');
            let taskId = event.target.parentElement.parentElement.getAttribute('data-taskId');
            let next = event.target;
            for (let i = 1; i < taskSpan; i++) {
                next = next.nextSibling;
                if (next.classList.contains('active-schedule') && next.getAttribute('data-taskId') !== taskId) {
                    canDrop = false;
                    event.target.classList.remove('over-class');
                    for (let j = 0; j < i; j++) {
                        next.previousSibling.classList.remove('over-class');
                        next = next.previousSibling;
                    }
                    i = taskSpan;
                } else {
                    if (next.getAttribute('data-taskId') !== taskId) {
                        next.classList.add('over-class');
                    } else {
                        i = taskSpan;
                    }
                }
            }
        }
    };

    const onDragEnterHandler = (event) => {

    };

    const onDragLeaveHandler = (event) => {
        event.target.classList.remove('over-class');
        let taskSpan = +event.target.parentElement.parentElement.getAttribute('data-taskSpan');
        let next = event.target;
        for (let i = 1; i < taskSpan; i++) {
            next = next.nextSibling;
            next.classList.remove('over-class');
        }
    };

    const onDropHandler = (event) => {
       let schedule =  event.dataTransfer.getData('text').split(':');
        newSchedule = {
            ...newSchedule,
            userId: user._id,
            span: schedule[0],
            scheduleId: schedule[1],
            targetId: schedule[2],
            days: [+event.target.getAttribute('data-day')],
        };
        for (let i = 1; i < +schedule[0]; i++) {
            newSchedule.days.push(newSchedule.days[0] + i);
        }

        ctrlFlag ? addTask(newSchedule) : replaceTask(newSchedule);
    };

    let tdClasses = (date) => classNames({
        'active': isSelectedCell(user._id, date.dayNumber),
        'weekend': date.weekDay === 'Sa' || date.weekDay === 'Su',
    });


    return (
        getSpan(date.dayNumber, user._id).active ?
            <td colSpan={isUserSingle ? 1 : getSpan(date.dayNumber, user._id).span}
                rowSpan={isUserSingle ? getSpan(date.dayNumber, user._id).span : 1}
                data-day={date.dayNumber}
                data-taskid={getSpan(date.dayNumber, user._id).scheduleId}
                className={'active-schedule'}
                key={user._id + date._id}
                ref={ref}
                onDoubleClick={() => deleteSchedule(getSpan(date.dayNumber, user._id).scheduleId)}
                onDragStart={(event) => onDragStartHandler(event, getSpan(date.dayNumber, user._id).span, getSpan(date.dayNumber, user._id).scheduleId, getSpan(date.dayNumber, user._id).target._id)}
                draggable
                onDragEnd={(event) => onDragEndHandler(event)}

            ><div>
                {getSpan(date.dayNumber, user._id).target.sn}
                {' '}{getSpan(date.dayNumber, user._id).target.name}
                {' '}{getSpan(date.dayNumber, user._id).target.address}
                {/*<span className="delete-schedule"*/}
                {/*      onClick={() => deleteSchedule(getSpan(date.dayNumber, user._id).scheduleId)}>edit</span>*/}
            </div>
            </td>
            :
            <td onMouseDown={(event) => mouseDown(user._id, event)}
                onMouseEnter={(event) => mouseEnter(user._id, event)}
                onMouseUp={(event) => mouseUp(user._id, event)}
                data-day={date.dayNumber}
                key={user._id + date._id}
                ref={ref}
                className={tdClasses(date)}
                onDragOver={(event) => onDragOverHandler(event)}
                onDragLeave={(event) => onDragLeaveHandler(event)}
                onDragEnter={(event) => onDragEnterHandler(event)}
                onDrop={(event) => onDropHandler(event)}
                onDragStart={event => event.preventDefault()}
            > </td>
    )
};

export default SingleCell;