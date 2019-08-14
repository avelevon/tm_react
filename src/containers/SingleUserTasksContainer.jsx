import React, {PureComponent, Fragment} from 'react';

import {connect} from 'react-redux';

import {load as loadUsers} from 'actions/users';
import SingleUserTasks from "components/SingleUserTasks";
import {load as loadSchedulesAction} from "actions/schedules";
import {load as loadTargetsAction} from "actions/targets";
import {load as loadDatesAction} from "actions/dates";


class SingleUserTasksContainer extends PureComponent {
    componentDidMount() {
        const {loadUsers, loadSchedules, loadTargets, loadDates, user, schedules, targets, dates} = this.props;
        if (!user) {
            loadUsers();
        }
        if (schedules.length === 0) {
            loadSchedules();
        }
        if (targets.length === 0) {
            loadTargets();
        }
        if (dates.length === 0) {
            loadDates();
        }
    }

    render() {

        const {user, schedules, targets, dates, loadingUsers, loadingSchedules, loadingTargets, loadingDates} = this.props;

        return (
            <Fragment>
                {!loadingUsers && !loadingSchedules && !loadingTargets && !loadingDates ?  <SingleUserTasks user={user} schedules={schedules} targets={targets} dates={dates}/> : 'Loading...' }
            </Fragment>
        )
    }
}


const mapStateToProps = (state, props) => {
    const { match } = props;

    const user = state.users.items.find(user => user._id === match.params.id);

    const schedules = state.schedules.items.filter(schedule => schedule.userId === user._id);

    return {
        user,
        schedules,
        targets: state.targets.items,
        dates: state.dates.items,
        loadingUsers: state.users.loading,
        loadingSchedules: state.schedules.loading,
        loadingTargets: state.targets.loading,
        loadingDates: state.dates.loading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUsers: () => dispatch(loadUsers()),
        loadSchedules: () => dispatch(loadSchedulesAction()),
        loadTargets: () => dispatch(loadTargetsAction()),
        loadDates: () => dispatch(loadDatesAction()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleUserTasksContainer);