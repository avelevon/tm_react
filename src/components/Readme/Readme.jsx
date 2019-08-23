import './Readme.scss'
import React, {PureComponent} from 'react';

export default class Readme extends PureComponent {
    static defaultProps = {}

    render() {
        return (
            <div className="Readme">
                <div>
                    <h3>To create the task:</h3>
                    <p>1. Select cells - click on cell or click and drag required amount of cells.</p>
                    <p>2. Select target - select target in field Select - start typing the target name and filtered targets will be
                        shown.</p>
                    <p>3. Click Create Task button.</p>
                </div>
                <div>
                    <h3>To move the task</h3>
                    <p>1. Drag and drop the task to relocate it.</p>
                    <p>2. Drag is possible if tasks are not intersect.</p>
                </div>
                <div>
                    <h3>To change the task</h3>
                    <p>1. Double click on required task.</p>
                    <p>2. Change the task as needed then press button Create Task.</p>
                </div>
                <div>
                    <h3>Click on user name to reach single user schedule</h3>
                </div>
                <div>
                    <h3>In USERS menu it's possible to create and delete users</h3>
                </div>
                <div>
                    <h3>In TARGETS menu it's possible to create and delete targets</h3>
                </div>
            </div>
        )
    }
}