import './ClearCells.scss'
import React, {PureComponent} from 'react';
import {Button} from "antd";

const ClearCells = (props) => {

    const {clearCells} = props;
    return (
        <div className="ClearCells">
            <Button onClick={clearCells} size="small" ghost>
                Clear Selected Cells
            </Button>
        </div>
    )
}
export default ClearCells;