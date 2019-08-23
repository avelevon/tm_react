import './SingleUserTasks.scss'
import React, {createRef, Fragment, PureComponent} from 'react';
import UserSingleHome from "components/UserSingleHome";
import classNames from "classnames";
import {Link} from "react-router-dom";
import SingleCell from "components/SingleCell/SingleCell";
import CalendarVertical from "components/CalendarVertical";
import makeGetSpanDates from "selectors/selectorSpanDates";
import {connect} from "react-redux";

class SingleUserTasks extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            homeRef: createRef(),
            todayRef: createRef(),
        }
    }

    componentDidMount() {
        this.scrollToToday();
    }

    getToday = () => {
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth();
        let currentDay = currentDate.getDate();
        let today = 0;
        for (let i = 0; i <= currentMonth; i++) {
            let daysInMonth = new Date(year, i + 1, 0);
            let upToDay = currentMonth === i ? currentDay : daysInMonth.getDate();
            for (let j = 1; j <= upToDay; j++) {
                today++;
            }
        }
        return today;
    };

    scrollToToday = () => {
        const {homeRef, todayRef} = this.state;

        if (homeRef.current) {

            homeRef.current.scrollTo(0, todayRef.current.offsetTop - 200)
        }
    };
    render() {
        const {dates, spanDates, monthsSpan, weeksSpan, user, getSpan, deleteSchedule, mouseDown, mouseEnter, mouseUp, replaceTask, isSelectedCell, isUserSingle} = this.props;
        const { todayRef, homeRef } = this.state;

        return (
            <div className="SingleUserTasks">
                <table ref={homeRef}>
                    <tbody>
                    {dates.map((date, index) => <tr key={date._id}>
                        <CalendarVertical date={date}
                                          getToday={this.getToday}
                                          monthsSpan={monthsSpan}
                                          weeksSpan={weeksSpan}
                                          ref={todayRef}
                        >
                            {spanDates.dates.find(item => item.dayNumber === date.dayNumber) ? <SingleCell replaceTask={replaceTask}
                                                                                                           date={date}
                                                                                                           spanDates={spanDates}
                                                                                                           user={user}
                                                                                                           getSpan={getSpan}
                                                                                                           deleteSchedule={deleteSchedule}
                                                                                                           mouseDown={mouseDown}
                                                                                                           mouseEnter={mouseEnter}
                                                                                                           mouseUp={mouseUp}
                                                                                                           isSelectedCell={isSelectedCell}
                                                                                                           isUserSingle={isUserSingle}

                            /> : null}
                        </CalendarVertical>
                    </tr>)}

                    </tbody>
                </table>
            </div>
        )
    }
}

const makeMapStateToProps = () => {
    const getSpanDates = makeGetSpanDates();
    const mapStateToProps = (state, props) => {
        return {
            spanDates: getSpanDates(state, props),
        }
    };
    return mapStateToProps;
};

export default connect(makeMapStateToProps)(SingleUserTasks);