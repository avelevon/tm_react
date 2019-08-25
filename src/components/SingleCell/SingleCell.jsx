import './SingleCell.scss'
import React, {PureComponent, Fragment, useRef} from 'react';
import classNames from 'classnames';
import {add as addTask} from 'actions/schedules';
import {useDrag, useDrop} from "react-dnd-cjs";
import ItemTypes from "../../ItemTypes";

const SingleCell = (props) => {
    const {date, user, getSpan, deleteSchedule, mouseDown, mouseEnter, mouseUp, replaceTask, isSelectedCell, isUserSingle, onDragHandler} = props;

    const ref = useRef(null);

    let newSchedule = {};

    const [{isOver, canDrop}, drop] = useDrop({
        accept: ItemTypes.SCHEDULE,
        drop(item){
            newSchedule = {
                ...newSchedule,
                userId: user._id,
                days: [+ref.current.getAttribute('data-day')],
                scheduleId: item.id,
                targetId: item.targetId,
            };
            for (let i = 1; i < item.span; i++) {
                newSchedule.days.push(newSchedule.days[0] + i);
            }

            replaceTask(newSchedule);

        },
        canDrop(item, monitor) {
           let next = ref.current.nextSibling;
           for (let i = 1; i < item.span; i++) {
               if (next.classList.contains('active-schedule')) {
                   return false;
               }
               next = next.nextSibling;
           }
           return true;
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.isOver() ? !!monitor.canDrop() : '',
        })
    });

    const [{isDragging, canDrag}, drag] = useDrag({
        item: {
            user: user,
            span: getSpan(date.dayNumber, user._id).span,
            id: getSpan(date.dayNumber, user._id).scheduleId,
            targetId: getSpan(date.dayNumber, user._id).target._id,
            type: ItemTypes.SCHEDULE,
        },
        end(item, monitor) {

        },
        canDrag() {
            return getSpan(date.dayNumber, user._id).active;
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        })
    });


    getSpan(date.dayNumber, user._id).active ? drag(ref) : drop(ref) ;


    let tdClasses = (date) => classNames({
        'over-class': isOver && canDrop,
        'no-drop': isOver && !canDrop,
        'active': isSelectedCell(user._id, date.dayNumber),
        'weekend': date.weekDay === 'Sa' || date.weekDay === 'Su',
    });


    return (
        getSpan(date.dayNumber, user._id).active ?
            <td colSpan={isUserSingle ? 1 : getSpan(date.dayNumber, user._id).span}
                rowSpan={isUserSingle ? getSpan(date.dayNumber, user._id).span : 1}
                data-day={date.dayNumber}
                className={'active-schedule'}
                key={user._id + date._id}
                ref={ref}
                onDoubleClick={() => deleteSchedule(getSpan(date.dayNumber, user._id).scheduleId)}

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
                onDrag={onDragHandler}

            > </td>
    )
};
export default SingleCell;