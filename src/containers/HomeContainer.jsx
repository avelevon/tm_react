import React, {Fragment, PureComponent} from 'react';
import Home from "components/Home";
import {connect} from "react-redux";
import {load as loadDatesAction} from "actions/dates";
import {load as loadUsersAction} from 'actions/users';
import {load as loadTargetsAction} from 'actions/targets';
import {load as loadSchedulesAction} from 'actions/schedules';
import {add as addTask} from 'actions/schedules';
import {replace as replaceTask} from 'actions/schedules';
import {deleteSingleItem} from "actions/schedules";
import getMonthSpan from "selectors/selectorMonthSpan";
import getWeekSpan from "selectors/selectorWeekSpan";
import getSpanDates from "selectors/selectorSpanDates";

import FormCreateTask from "components/FormCreateTask";
import {resetCells, select as selectSingleCell} from "actions/cells";
import {reset as resetCellsAction} from "actions/cells";
import SingleUserTasks from "components/SingleUserTasks";
import ClearCells from "components/ClearCells";
import moment from 'moment';

class HomeContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: undefined,
            selectedTargetId: '',
            months: [],
            daysInMonth: [],
            _schedules: [],
            pressed: false,
        }
    }

    componentDidMount() {
        const {loadDates, loadUsers, loadTargets, loadSchedules, dates, users, targets, schedules} = this.props;
        dates.length === 0 ? loadDates() : null;
        if (!users) {
            loadUsers();
        } else if (users.length === 0) {
            loadUsers();
        } else {
            return null
        }
        targets.length === 0 ? loadTargets() : null;
        schedules.length === 0 ? loadSchedules() : null;

    }

    //get colspan number for task
    getSpan = (date, id) => {
        const {targets, schedules} = this.props;
        let span = 1;
        let active = false;
        let target = {};
        let sch_id = '';
        schedules.map((schedule) => {
            if (schedule.userId === id) {
                schedule.days.map((day, i, arr) => {
                    if (moment(day).isSame(date, 'day') && !moment(day).subtract(1, 'days').isSame(moment( arr[i - 1]))) {
                        sch_id = schedule._id;
                        active = true;
                        let k = i;
                        while (moment(arr[k + 1]).subtract(1, 'days').isSame(moment(arr[k]))) {
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

    //set target for task
    setTarget = (val) => {
        this.setState((prevState) => ({
            ...prevState,
            selectedOption: val,
            selectedTargetId: val,
            _schedules: prevState._schedules.map((_schedule) => ({
                ..._schedule,
                targetId: val,
            }))
        }));

    };

    //confirm selected cells and target - create task
    confirmTask = (item) => {
        const {_schedules} = this.state;
        const {addSingleTask} = this.props;
        _schedules.forEach((_schedule) => {
            if (_schedule.userId && _schedule.targetId && _schedule.days) {
                addSingleTask(_schedule);
                this.setState({
                    selectedOption: undefined,
                    selectedTargetId: '',
                    _schedules: [],
                })
            }
        });
    };


    addTask = (item) => {
        const {addSingleTask} = this.props;
        addSingleTask({
            targetId: item.targetId,
            userId: item.userId,
            days: item.days,
        })
    }

    //relocate task
    replaceTask = (task) => {
        const {replaceSingleTask} = this.props;
        replaceSingleTask(task);
    };

    //edit task - deleting task then select cells and target of deleted task
    editTask = (id) => {

        const {deleteSingleSchedule, schedules, targets, selectCell} = this.props;

        const editingSchedule = schedules.find((schedule) => schedule._id === id);

        deleteSingleSchedule(id);

        const editingTarget = targets.find((target) => target._id === editingSchedule.targetId);

        this.setState({
            selectedOption: editingTarget._id,
            selectedTargetId: editingSchedule.targetId,
            _schedules: [{
                userId: editingSchedule.userId,
                targetId: editingSchedule.targetId,
                days: editingSchedule.days,
            }],
        }, () => {
            this.state._schedules[0].days.forEach((day) => {
                selectCell({
                    userId: editingSchedule.userId,
                    day: day,
                });
            });
        })
    };

    //recheck if cells are selected
    isSelectedCell = (userId, date) => {
        let flag = false;
        const {cells} = this.props;
        if (cells[userId]) {
            flag = !!cells[userId].find((day) => moment(date).isSame(day, 'day') );
        }
        return flag;
    };

    mouseDown = (uId, event) => {
        const {selectCell, cells} = this.props;
        event.target.classList.toggle('active');
        selectCell({
            userId: uId,
            day: moment(event.target.dataset.day),
        });
        this.setState((prevState) => ({
            ...prevState,
            pressed: true,
        }))
    };

    mouseEnter = (uId, event) => {
        const {selectCell, cells} = this.props;
        const {pressed} = this.state;
        if (pressed) {
            event.target.classList.toggle('active');
            selectCell({
                userId: uId,
                day: moment(event.target.dataset.day),
            });
        }
    };

    mouseUp = (userId, event) => {
        const {selectedTargetId} = this.state;
        const {cells} = this.props;
        this.setState((prevState) => ({
            ...prevState,
            pressed: false,
        }));

        let days = [];

        this.setState((prevState) => ({
            ...prevState,
            _schedules: prevState._schedules.filter(_schedule => _schedule.userId !== userId),
            pressed: false,
        }));

        let selectedCellsToUser = cells[userId];
        days.push(...selectedCellsToUser);
        days.sort((a, b) => {
            return a - b;
        });

        this.setState((prevState) => ({
            ...prevState,
            _schedules: prevState._schedules.concat({
                userId: userId,
                targetId: selectedTargetId,
                days: days,
            }),
        }));

    };

    clearCells = () => {
        const { resetCells } = this.props;
        resetCells();

        let activeElems = document.querySelectorAll('.active');
        for (let i = 0; i < activeElems.length; i++) {
            activeElems[i].classList.remove('active');
        }

        this.setState({
            selectedOption: undefined,
            selectedTargetId: '',
            _schedules: [],
        })
    }

    render() {
        const {dates, users, targets, monthsSpan, weeksSpan, loadingUsers, loadingSchedules, loadingDates, isUserSingle} = this.props;
        const {selectedOption} = this.state;
        return (
            <Fragment>
                <FormCreateTask selectedOption={selectedOption} confirmTask={this.confirmTask} targets={targets}
                                setTarget={this.setTarget}/>
                <ClearCells clearCells={this.clearCells}/>
                <div>{loadingUsers ? null :
                    isUserSingle ? <SingleUserTasks dates={dates}
                                                    monthsSpan={monthsSpan}
                                                    weeksSpan={weeksSpan}
                                                    user={users}
                                                    isUserSingle={isUserSingle}
                                                    getSpan={this.getSpan} deleteSchedule={this.editTask}
                                                    mouseDown={this.mouseDown}
                                                    mouseEnter={this.mouseEnter}
                                                    mouseUp={this.mouseUp}
                                                    replaceTask={this.replaceTask}
                                                    isSelectedCell={this.isSelectedCell}
                        /> :
                        <Home dates={dates}
                              users={users}
                              isUserSingle={isUserSingle}
                              getSpan={this.getSpan}
                              deleteSchedule={this.editTask}
                              mouseDown={this.mouseDown}
                              mouseEnter={this.mouseEnter}
                              mouseUp={this.mouseUp}
                              replaceTask={this.replaceTask}
                              isSelectedCell={this.isSelectedCell}
                              loadingDates={loadingDates}
                              loadindSchedules={loadingSchedules}
                              addTask={this.addTask}
                        />}

                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state, props) => {
    const {match} = props;

    let users = state.users.items;

    let isUserSingle = false;

    if (match.params.id) {
        users = state.users.items.find(user => user._id === match.params.id);
        isUserSingle = true;
    }

    return {
        dates: state.dates.items,
        users,
        isUserSingle,
        targets: state.targets.items,
        schedules: state.schedules.items,
        cells: state.cells,
        loadingUsers: state.users.loading,
        loadingSchedules: state.schedules.loading,
        loadingDates: state.dates.loading,
        monthsSpan: getMonthSpan(state),
        weeksSpan: getWeekSpan(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadDates: () => dispatch(loadDatesAction()),
        loadUsers: () => dispatch(loadUsersAction()),
        loadTargets: () => dispatch(loadTargetsAction()),
        loadSchedules: () => dispatch(loadSchedulesAction()),
        deleteSingleSchedule: (id) => dispatch(deleteSingleItem(id)),
        addSingleTask: (item) => dispatch(addTask(item)),
        replaceSingleTask: (item) => dispatch(replaceTask(item)),
        selectCell: (item) => dispatch(selectSingleCell(item)),
        resetCells: () => dispatch(resetCellsAction()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)