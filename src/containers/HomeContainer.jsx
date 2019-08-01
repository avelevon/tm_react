import React, {PureComponent} from 'react';
import Home from "components/Home";
import {connect} from "react-redux";
import {load as loadDates} from "actions/dates";
import CreateCalendar from "containers/CreateCalendar";
import {load as loadUsersAction} from 'actions/users';

class HomeContainer extends PureComponent {
    static defaultProps = {}

    constructor(props) {
        super(props);
        super(props);
        this.state = {
            months: [],
            daysInMonth: []
        }

    }

    componentDidMount() {
        const {load, loadUsers} = this.props;
        load();
        loadUsers();

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

    render() {
        const {dates, users} = this.props;

        return (
            <div>
                <Home dates={dates} monthsSpan={this.getMonthsSpan()} weeksSpan={this.getWeeksSpan()} users={users}/>
                <CreateCalendar/>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        dates: state.dates.items,
        users: state.users.items
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        load: () => dispatch(loadDates()),
        loadUsers: () => dispatch(loadUsersAction()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)