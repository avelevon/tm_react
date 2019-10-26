import './ScrollToToday.scss'
import React, {PureComponent} from 'react';
import {Button} from "antd";

const ScrollToToday = (props) => {

    const {scrollToToday} = props;

    return (
        <div className="ScrollToToday">
            <Button onClick={scrollToToday} size="small" ghost>
                Scroll to Today
            </Button>
        </div>
    )
}
export default ScrollToToday;