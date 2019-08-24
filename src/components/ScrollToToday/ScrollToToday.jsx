import './ScrollToToday.scss'
import React, {PureComponent} from 'react';

const ScrollToToday = (props) => {

    const {scrollToToday} = props;

    return (
        <button className="ScrollToToday" onClick={scrollToToday}>
            Scroll to Today
        </button>
    )
}
export default ScrollToToday;