import React, {PureComponent} from 'react';
import Home from "components/Home";
import {connect} from "react-redux";
import {add as addDatesToDB} from 'actions/dates';
import {load as loadDates} from "actions/dates";

class CreateCalendar extends PureComponent {
    static defaultProps = {}

    constructor(props) {
        super(props);
        this.state = {
            dates: [],
        }

    }

    componentDidMount(prevState) {
        this.setDates(2019);
    }

    setDates = (year) => {
        let w = 8;
        for (let i = 0; i < 12; i++) {
            let daysInMonth = new Date(year, i + 1, 0);
            for (let j = 1; j <= daysInMonth.getDate(); j++) {
                w++;
                let curDay = new Date(year, i, j);

                let wd = '';
                switch (curDay.getDay()) {
                    case 0 :
                        wd = 'Su';
                        break;
                    case 1 :
                        wd = 'Mo';
                        break;
                    case 2 :
                        wd = 'Tu';
                        break;
                    case 3 :
                        wd = 'We';
                        break;
                    case 4 :
                        wd = 'Th';
                        break;
                    case 5 :
                        wd = 'Fr';
                        break;
                    case 6 :
                        wd = 'Sa';
                        break;
                }

                let mn = '';
                switch (i) {
                    case 0 :
                        mn = 'Jan';
                        break;
                    case 1 :
                        mn = 'Feb';
                        break;
                    case 2 :
                        mn = 'Mar';
                        break;
                    case 3 :
                        mn = 'Apr';
                        break;
                    case 4 :
                        mn = 'May';
                        break;
                    case 5 :
                        mn = 'Jun';
                        break;
                    case 6 :
                        mn = 'Jul';
                        break;
                    case 7 :
                        mn = 'Aug';
                        break;
                    case 8 :
                        mn = 'Sep';
                        break;
                    case 9 :
                        mn = 'Oct';
                        break;
                    case 10 :
                        mn = 'Nov';
                        break;
                    case 11 :
                        mn = 'Dec';
                        break;
                }

                this.state.dates.push({
                    year: 2019,
                    month: mn,
                    day: j,
                    weekDay: wd,
                    weekNumber: Math.floor(w / 7),
                })
            }
        }
    };

    saveDates = () => {
        const {dates} = this.state;

        const {addDates} = this.props;
        dates.forEach(function (date) {
            addDates(date);
        })
    };

    render() {
        const {dates} = this.props;
        return (
            <div>
                {dates.length === 0 ? <button style={this.getButtonDisplay} onClick={this.saveDates}>Create calendar in DB</button> : ''}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        dates: state.dates.items,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addDates: (date) => dispatch(addDatesToDB(date)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCalendar)