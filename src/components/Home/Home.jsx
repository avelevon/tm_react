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
            scrollEvent: undefined,
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

    scrollHandler = (event) => {
        event.persist()
        this.setState({
            scrollEvent: event
        })
    }
    render() {
        const {dates, monthsSpan, weeksSpan, users, getSpan, deleteSchedule, mouseDown, mouseEnter, mouseUp, replaceTask, isSelectedCell, isUserSingle, loadingDates, loadingSchedules, addTask} = this.props;
        const {todayRef, homeRef, ctrlFlag, scrollEvent} = this.state;
        return (
            <div className="Home">
                <ScrollToToday scrollToToday={this.scrollToToday}/>
                <table ref={homeRef} onScroll={(event) => this.scrollHandler(event)}>
                    <thead className="Calendar">
                    {homeRef.current ? <Calendar homeRef={homeRef} scrollEvent={scrollEvent}/> : null}
                    </thead>
                    <tbody>

                    {users.map((user) =>
                        <tr data-user={user._id} key={user._id} >
                            {/*<td className="names fixed" ref={ref => this.moveToLeftSide(ref)}>*/}
                            <td className="names fixed">
                                {/*<Link to={`/users/${user._id}`}>{user.name}</Link>*/}
                                <p >{user.name}</p>
                            </td>
                            {/*<td className="empty-cell"> </td>*/}
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
