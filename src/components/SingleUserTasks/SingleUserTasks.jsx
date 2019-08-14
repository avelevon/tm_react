import './SingleUserTasks.scss'
import React, {PureComponent} from 'react';

export default class SingleUserTasks extends PureComponent {
    static defaultProps = {}
    
    render() {
        const { user, schedules, targets, dates } = this.props;

        console.log(dates);

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