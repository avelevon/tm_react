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
import getMonthSpan from "selectors/selectorMonthSpan";
import getWeekSpan from "selectors/selectorWeekSpan";
import getSpanDates from "selectors/selectorSpanDates";

import FormCreateTask from "components/FormCreateTask";

class HomeContainer extends PureComponent {
    static defaultProps = {}

    constructor(props) {
        super(props);

        this.state = {
            selectedOption: null,
            selectedTargetId: '',
            userIds: [],
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

    getSpan = (index, id) => {
        const {targets, schedules} = this.props;
        let span = 1;
        let active = false;
        let target = {};
        let sch_id = '';
        schedules.map((schedule) => {
            if (schedule.userId === id) {
                schedule.days.map((day, i, arr) => {
                    if (day === index && day - arr[i - 1] !== 1) {
                        sch_id = schedule._id;
                        active = true;
                        let k = i;
                        while (arr[k + 1] - arr[k] === 1) {
                            k++;
                            span++;
                        }
                        targets.map((item) => {
                            if (item._id === schedule.targetId) {
                                target = item;
                            }
                        });
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
        const {_schedules, userIds} = this.state;
        const {addSingleTask} = this.props;
        _schedules.forEach((_schedule) => {
            if (_schedule.userId && _schedule.targetId && _schedule.days ) {
                addSingleTask(_schedule);
                userIds.forEach((userId) => {
                    this.setState({
                        [userId]: [],
                        selectedOption: null,
                        selectedTargetId: '',
                        _schedules: [],
                    }, () => console.log(this.state))
                });
            }
        });
    };

    mouseDown = (uId, event) => {
        event.persist();

        this.setState((prevState) => ({
            ...prevState,
            [uId]: prevState[uId] ? prevState[uId] : [],
            userIds: prevState[uId] && !prevState.userIds.find((item) => {return item === uId}) ? prevState.userIds.concat(uId) : prevState.userIds,
        }));

        if (event.target.tagName === 'TD') {
            event.target.classList.toggle('active');
            this.setState((prevState) => ({
                ...prevState,
                pressed: true,
                [uId]: prevState[uId].includes(event.target) ? prevState[uId].filter((item) => item !== event.target) : prevState[uId].concat(event.target),
            }), () => console.log(this.state))
        }
    };

    mouseEnter = (uId, event) => {
        event.persist();
        this.setState((prevState) => ({
            ...prevState,
            [uId]: prevState[uId] ? prevState[uId] : [],
            userIds: prevState[uId] && !prevState.userIds.find((item) => {return item === uId}) ? prevState.userIds.concat(uId) : prevState.userIds,
        }));
        if (event.target.tagName === 'TD') {
            const {pressed} = this.state;
            if (pressed) {
                event.target.classList.toggle('active');
                this.setState((prevState) => ({
                    ...prevState,
                   [uId]: prevState[uId].includes(event.target) ? prevState[uId].filter((item) => item !== event.target) : prevState[uId].concat(event.target),

                }), () => console.log(this.state))
            }
        }
    };

    mouseUp = (userId, event) => {
        const {selectedTargetId } = this.state;

        this.setState((prevState) => ({
            ...prevState,
            _schedules: prevState._schedules.filter((_schedule) => {
                return _schedule.userId !== userId
            }),
            pressed: false,
        }), () => console.log(this.state));

        let days = [];
        let selectedCellsToUser = this.state[userId];
        selectedCellsToUser.forEach((item) => {
                days.push(+item.dataset.day);
                days.sort((a, b) => {
                    return a - b;
            })

        });

        this.setState((prevState) => ({
            ...prevState,
            _schedules: prevState._schedules.concat({
                userId: userId,
                targetId: selectedTargetId,
                days: days,
            }),
        }), () => console.log(this.state._schedules));

    };

    render() {
        const {dates, users, deleteSingleSchedule, targets, monthsSpan, weeksSpan, schedules, datesSpan} = this.props;
        const {selectedOption} = this.state;

        if (dates.length !== 0) {
            return (
                <div>
                    <Home dates={dates}
                          spanDates={datesSpan} monthsSpan={monthsSpan}
                          weeksSpan={weeksSpan} users={users}
                          getSpan={this.getSpan} deleteSchedule={deleteSingleSchedule}
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
        schedules: state.schedules.items,
        monthsSpan: getMonthSpan(state),
        weeksSpan: getWeekSpan(state),
        datesSpan: getSpanDates(state),
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