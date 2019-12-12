import './Calendar.scss'
import React, {PureComponent, Fragment, useEffect, createRef} from 'react';
import {connect} from "react-redux";

import {loadMore as loadMoreAction} from 'actions/dates';
import moment from "moment";
import isEqual from 'lodash/isEqual';
import classNames from "classnames";

class Calendar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            todayRef: createRef(),
            scrollFlag: true,
            oldWidth: 0,
            scrollCanTrigger: true,
            monthPosition: 0,
        }
    }

    componentDidMount() {
        this.scrollToToday();
    }

    componentDidUpdate(prevProps, prevState) {
        const {oldWidth} = this.state;
        const {homeRef, scrollEvent, scale, scrollTrigger} = this.props;

        !isEqual(prevProps.scale, scale) ?   this.scrollToToday() : null;
        !isEqual(prevProps.scrollTrigger, scrollTrigger) ?   this.scrollToToday() : null;

        this.loadMoreDatesHandler(scrollEvent);
        if (oldWidth < homeRef.current.firstChild.clientWidth) {
            this.scrollToRightAfterBack(oldWidth, homeRef.current.firstChild.clientWidth);
            this.setState({
                oldWidth: homeRef.current.firstChild.clientWidth,
            });
        }
    }

    scrollToRightAfterBack = (oldWidth, newWidth) => {
        const {homeRef} = this.props;
        if (homeRef.current.scrollLeft < 10) {
            homeRef.current.scrollTo(newWidth - oldWidth, 0);
        }
    }

    scrollToToday = () => {
            const {homeRef} = this.props;
            const {todayRef} = this.state;

        if (homeRef.current && todayRef.current) {
            homeRef.current.scrollTo(todayRef.current.offsetLeft - 400, 0);

            homeRef.current.addEventListener('scroll', () => {
                this.setState({
                    scrollFlag: false,
                })
            });
        }
    };

    loadMoreDatesHandler = (scrollEvent) => {
        const {homeRef, loadMoreDates } = this.props;
        const {scrollCanTrigger} = this.state;

        if (homeRef.current.firstChild.clientWidth - homeRef.current.clientWidth + 1 - homeRef.current.scrollLeft < 10) {
            if (scrollCanTrigger) {
                this.setState({
                    scrollCanTrigger: false,
                });
                loadMoreDates('forward');
            }
        }
        if (homeRef.current.scrollLeft < 10) {
            if (scrollCanTrigger) {
                this.setState({
                    scrollCanTrigger: false,
                });
                loadMoreDates('back');
            }
        }
        if (homeRef.current.scrollLeft > 10 && homeRef.current.firstChild.clientWidth - homeRef.current.clientWidth + 1 - homeRef.current.scrollLeft > 10) {
            this.setState({
                scrollCanTrigger: true,
            })
        }
    };

    monthPositionHandler = (ref) => {
        const {homeRef} = this.props;

        if (ref) {
            const refPos = ref.getBoundingClientRect();
            let pos = - refPos.left + homeRef.current.clientWidth / 2;
            if (-refPos.left + homeRef.current.clientWidth / 2 > refPos.width - 130) {
                pos = refPos.width - 130;
            }
            if (refPos.right - homeRef.current.clientWidth / 2 > refPos.width - 20) {
                pos = 20;
            }
            this.setState({
                [ref.innerText]: pos,
            })
        }
    };

    monthTextRef = (ref) => {
        ref ? ref.style.left =  this.state[ref.innerText] + 'px' : null;
    };

    render() {
        const {dates, scale} = this.props;
        const {todayRef} = this.state;

        const monthsSpan = dates.filter((date, i, arr) => {
            if (i > 0) {
                return date.month() !== arr[i - 1].month()
            }
            return true;
        });


        const weeksSpan = dates.filter((date, i, arr) => {
            if (i > 0) {
                return date.week() !== arr[i - 1].week()
            }
            return true;
        });

        let tdClasses = (date) => classNames({
            'today': moment().isSame(date, 'day'),
            'weekend': date.day() === 0 || date.day() === 6,
        });


        return (
            <Fragment>
                <tr className="months">
                    <td>Month</td>
                    {monthsSpan.map((item, index) => <td key={index}
                                                         ref={ref => this.monthPositionHandler(ref)}
                                                         colSpan={index !== monthsSpan.length - 1 ? item.daysInMonth() - (item.date() - 1) : dates[dates.length - 1].date()}>
                        <div className="month-position"
                             ref={ref => this.monthTextRef(ref)}
                             style={{
                                 position: 'absolute',
                                 top: 0,
                             }}
                        >{item.format('MMMM')} / {item.format('YYYY')}</div>
                    </td>)}
                </tr>
                <tr className="weeks">
                    <td>Week</td>
                    {weeksSpan.map((item, index) => <td key={item.weekday() + item.format()}
                                                        colSpan={index !== weeksSpan.length - 1 ? 8 - (item.weekday() + 1) : dates[dates.length - 1].weekday() + 1}>
                        {item.week()}</td>)}
                </tr>
                <tr className="days">
                    <td style={{
                        minWidth: '200px'
                    }}>Day</td>
                    {dates.map((date, index) => <td key={date.format() + index}
                                                    ref={moment().isSame(date, 'day') ? todayRef : null}
                                                    className={tdClasses(date)}
                                                    style={{
                                                        minWidth: scale.width + 'px'
                                                    }}
                    >
                        <div>{date.date()} / {date.format('dd')}</div>
                    </td>)}
                </tr>
            </Fragment>
        )
    }
}


const mapStateToProps = (state, props) => {
    return {
        dates: state.dates.items,
        datesMoreLoading: state.dates.loading,
        scale: state.scale,
        scrollTrigger: state.dates.scrollTrigger,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadMoreDates: (direction) => dispatch(loadMoreAction(direction))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)