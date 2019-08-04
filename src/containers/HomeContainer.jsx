import React, {PureComponent} from 'react';
import Home from "components/Home";
import {connect} from "react-redux";
import {load as loadDates} from "actions/dates";
import CreateCalendar from "containers/CreateCalendar";
import {load as loadUsersAction} from 'actions/users';
import {load as loadTargetsAction} from 'actions/targets';
import {load as loadSchedulesAction} from 'actions/schedules';
import {add as addTask} from 'actions/schedules';
import {deleteSingleItem} from "actions/schedules";

import FormCreateTask from "components/FormCreateTask";

class HomeContainer extends PureComponent {
    static defaultProps = {}

    constructor(props) {
        super(props);

        this.state = {
            selectedOption: null,
            selectedTargetId: '',
            months: [],
            daysInMonth: [],
            _schedules: [],
            pressed: false,
        }

    }

    componentDidMount() {
        const {load, loadUsers, loadTargets, loadSchedules} = this.props;
        load();
        loadUsers();
        loadTargets();
        loadSchedules();
    }

    getMonthsSpan = () => {
        const {dates} = this.props;
        let daysNumberInMonth = [];
        let counter = -1;
        let months = dates.filter((date, i, arr) => {
            counter++;
            if (i > 0) {
                if (date.month === arr[i - 1].month) {
                    return false;
                } else {
                    daysNumberInMonth.push(counter);
                    counter = 0;
                    return true;
                }
            } else {
                return true;
            }
        });
        daysNumberInMonth.push(31);

        return {
            months: months,
            daysInMonth: daysNumberInMonth,
        }
    };

    getWeeksSpan = () => {
        const {dates} = this.props;
        let daysNumberInWeek = [];
        let counter = -1;
        let weeks = dates.filter((date, i, arr) => {
            counter++;
            if (i > 0) {
                if (date.weekNumber === arr[i - 1].weekNumber) {
                    return false;
                } else {
                    daysNumberInWeek.push(counter);
                    counter = 0;
                    return true;
                }
            } else {
                return true;
            }
        });
        daysNumberInWeek.push(3);

        return {
            weeks: weeks,
            daysInWeek: daysNumberInWeek,
        }
    };

    getRef = (element) => {
        if (element) {
            let span = element.getAttribute("colspan");
            for (let i = 1; i < span; i++) {
                let next = element.nextSibling;
                next.remove();
            }
        }
    };

    getSpan = (index, id, td) => {
        const {targets, schedules} = this.props;
        let span = 1;
        let active = false;
        let target = {};
        let sch_id = '';
        schedules.map((schedule) => {
            if (schedule.userId === id && schedule.startDay === index + 1) {
                span = +schedule.endDay - +schedule.startDay + 1;
                active = true;
                sch_id = schedule._id;
                targets.map((item) => {
                    if (item._id === schedule.targetId) {
                        target = item;
                    }
                });
            }
        });

        return {
            span: span,
            active: active,
            target: target,
            scheduleId: sch_id,
        };
    };


    setTarget = (event) => {
        this.setState((prevState) => ({
            ...prevState,
            selectedOption: event,
            selectedTargetId: event.value,
            _schedules: prevState._schedules.map((_schedule) => ({
                ..._schedule,
                targetId: event.value,
            }))
        }), () => console.log(this.state));

    };

    confirmTask = () => {
        const {_schedules} = this.state;
        const {addSingleTask} = this.props;
        _schedules.forEach((_schedule) => {
            if (_schedule) {
                addSingleTask(_schedule);
            }
        });

        this.setState((prevState) => ({
            selectedOption: null,
            selectedTargetId: '',
            _schedules: []
        }), () => console.log(this.state))
    };

    mouseDown = (event) => {
        event.target.classList.toggle('active');
        this.setState((prevState) => ({
            ...prevState,
            pressed: true,
        }), () => console.log(this.state))

    };

    mouseEnter = (event) => {
        const {pressed} = this.state;
        if (pressed) {
            event.target.classList.toggle('active');
        }

    };

    mouseUp = (userId, event) => {

        const { selectedTargetId } = this.state;

        this.setState((prevState) => ({
            ...prevState,
            pressed: false,
        }), () => console.log(this.state));

        let activeElems = document.getElementsByClassName('active');
        let arr = [...activeElems];
        let days =[];
        arr.forEach((item) => {
           days.push(+item.dataset.day);
        });


        this.setState((prevState) => ({
            ...prevState,
            _schedules: prevState._schedules.length !== 0 ? prevState._schedules.concat({
                targetId: selectedTargetId,
                userId: userId,
                startDay: Math.min.apply(Math, days),
                endDay: Math.max.apply(Math, days),
            }) : [{
                targetId: selectedTargetId,
                userId: userId,
                startDay: Math.min.apply(Math, days),
                endDay: Math.max.apply(Math, days),
            }]
        }), () => console.log(this.state));


    };

    render() {
        const {dates, users, deleteSingleSchedule, targets} = this.props;
        const {selectedOption} = this.state;
        if (dates.length !== 0) {
            return (
                <div>
                    <Home dates={dates} monthsSpan={this.getMonthsSpan()}
                          weeksSpan={this.getWeeksSpan()} users={users}
                          getSpan={this.getSpan} deleteSchedule={deleteSingleSchedule}
                          getRef={this.getRef}
                          mouseDown={this.mouseDown}
                          mouseEnter={this.mouseEnter}
                          mouseUp={this.mouseUp}
                    />
                    <FormCreateTask selectedOption={selectedOption} confirmTask={this.confirmTask} targets={targets}
                                    setTarget={this.setTarget}/>
                </div>

            )
        } else {
            return (
                <CreateCalendar/>
            )
        }

    }
}

const mapStateToProps = (state, props) => {
    return {
        dates: state.dates.items,
        users: state.users.items,
        targets: state.targets.items,
        schedules: state.schedules.items
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        load: () => dispatch(loadDates()),
        loadUsers: () => dispatch(loadUsersAction()),
        loadTargets: () => dispatch(loadTargetsAction()),
        loadSchedules: () => dispatch(loadSchedulesAction()),
        deleteSingleSchedule: (id) => dispatch(deleteSingleItem(id)),
        addSingleTask: (item) => dispatch(addTask(item)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)