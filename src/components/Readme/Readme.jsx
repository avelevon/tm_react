import './Readme.scss'
import React, {PureComponent} from 'react';
import {Card} from 'antd';

export default class Readme extends PureComponent {
    static defaultProps = {}

    render() {
        return (
            <div className="Readme">
                <Card size="small" title="To create the task">
                    <p>1. Select cells - click on cell or click and drag required amount of cells.</p>
                    <p>2. Select target - select target in field Select - start typing the target name and filtered targets will be
                        shown.</p>
                    <p>3. Click Create Task button.</p>
                </Card>
                <Card size="small" title="To move the task">
                    <p>1. Drag and drop the task to relocate it.</p>
                    <p>2. Drag is possible if tasks are not intersect.</p>
                </Card>
                <Card size="small" title="To change the task">
                    <p>1. Double click on required task.</p>
                    <p>2. Change the task as needed then press button Create Task.</p>
                </Card>
                <Card size="small">
                    <h4>Click on user name to reach single user schedule</h4>
                </Card>
                <Card size="small">
                    <h4>In USERS menu it's possible to create and delete users</h4>
                </Card>
                <Card size="small">
                    <h4>In TARGETS menu it's possible to create and delete targets</h4>
                </Card>
            </div>
        )
    }
}