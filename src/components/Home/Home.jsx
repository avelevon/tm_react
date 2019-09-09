import './Home.scss'
import React, {PureComponent, createRef } from 'react';
import UserSingleHome from "components/UserSingleHome";
import Calendar from "components/Calendar";
import {Link} from "react-router-dom";
import ScrollToToday from "components/ScrollToToday/ScrollToToday";


export default class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            homeRef: createRef(),
            todayRef: createRef(),
            flag: false,
            scrollFlag: true,
            ctrlFlag: false,
        }
    }
    componentDidMount() {
        this.moveToLeftSide();
        this.scrollToToday();
        this.setState({
            flag: true,
        })
        document.addEventListener('keydown', this.onKeyDownHandler);
        document.addEventListener('keyup', this.onKeyUpHandler);
    }
    componentDidUpdate() {
        this.moveToLeftSide();
        const {scrollFlag} = this.state;
        scrollFlag ? this.scrollToToday() : null;

    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDownHandler);
        document.removeEventListener('keyup', this.onKeyUpHandler);
    }

    onKeyDownHandler = (event) => {
        if (event.ctrlKey) {
           this.setState({
              ctrlFlag: true,
            })
        }
    };

    onKeyUpHandler = (event) => {
        this.setState({
            ctrlFlag: false,
        })
    };

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
    moveToLeftSide = (userRef) => {
        const{ homeRef } = this.state;

        if (userRef && homeRef.current) {
            userRef.style.left = homeRef.current.scrollLeft + 'px';
            homeRef.current.addEventListener('scroll', () => {
                userRef.style.left = homeRef.current.scrollLeft + 'px';
            })
        }
    };

    scrollToToday = () => {
        const {homeRef, todayRef } = this.state;
        if (homeRef.current && todayRef.current) {
            homeRef.current.scrollTo(todayRef.current.offsetLeft - 400, 0);
        }
        homeRef.current.addEventListener('scroll', () => {
            this.setState({
                scrollFlag: false,
            })

        })

    };

    render() {
        const {dates, monthsSpan, weeksSpan, users, getSpan, deleteSchedule, mouseDown, mouseEnter, mouseUp, replaceTask, isSelectedCell, isUserSingle, loadingDates, loadingSchedules, addTask} = this.props;
        const {todayRef, homeRef, ctrlFlag} = this.state;
        return (
            <div className="Home">
                <ScrollToToday scrollToToday={this.scrollToToday}/>
                <table ref={homeRef}>
                    <thead>
                    <Calendar dates={dates}
                              monthsSpan={monthsSpan}
                              weeksSpan={weeksSpan}
                              ref={todayRef}
                              getToday={this.getToday}
                    />
                    </thead>
                    <tbody>

                    {users.map((user) =>
                        <tr data-user={user._id} key={user._id} >
                            <td className="names fixed" ref={ref => this.moveToLeftSide(ref)}><Link to={`/users/${user._id}`}>{user.name}</Link></td>
                            <td className="empty-cell"> </td>
                            <UserSingleHome replaceTask={replaceTask} key={user._id}
                                            user={user}
                                            getSpan={getSpan}
                                            deleteSchedule={deleteSchedule}
                                            mouseDown={mouseDown}
                                            mouseEnter={mouseEnter}
                                            mouseUp={mouseUp}
                                            isSelectedCell={isSelectedCell}
                                            isUserSingle={isUserSingle}
                                            loadingDates={loadingDates}
                                            loadingSchedules={loadingSchedules}
                                            ctrlFlag={ctrlFlag}
                                            addTask={addTask}
                            />
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}
