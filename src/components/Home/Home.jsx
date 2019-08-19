import './Home.scss'
import React, {PureComponent, createRef } from 'react';
import UserSingleHome from "components/UserSingleHome";
import Calendar from "components/Calendar";
import {Link} from "react-router-dom";


export default class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            homeRef: createRef(),
            flag: false,
        }
    }
    componentDidMount() {
        this.moveToLeftSide();
        this.setState({
            flag: true,
        })
    }
    componentDidUpdate() {
        this.moveToLeftSide();
    }

    moveToLeftSide = (userRef) => {
        const{ homeRef } = this.state;

        if (userRef && homeRef.current) {
            userRef.style.left = homeRef.current.scrollLeft + 'px';
            homeRef.current.addEventListener('scroll', () => {
                userRef.style.left = homeRef.current.scrollLeft + 'px';
            })
        }
    };

    render() {
        const {dates, monthsSpan, weeksSpan, users, getSpan, deleteSchedule, mouseDown, mouseEnter, mouseUp, replaceTask, isSelectedCell, isUserSingle, loadingDates, loadingSchedules, onDragHandler} = this.props;

        return (
            <div className="Home">
                <table ref={this.state.homeRef}>
                    <thead>
                    {this.state.flag ? <Calendar dates={dates}
                                                            monthsSpan={monthsSpan}
                                                            weeksSpan={weeksSpan}
                                                            getRefHome={this.state.homeRef}
                                                            /> : null}
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
                                            onDragHandler={onDragHandler}
                            />
                        </tr>
                    )}

                    </tbody>
                </table>
            </div>
        )
    }
}
