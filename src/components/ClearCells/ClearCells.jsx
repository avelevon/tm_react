import './ClearCells.scss'
import React, {PureComponent} from 'react';

const ClearCells = (props) => {

    const {clearCells} = props;
    return (
        <button className="ClearCells"
                onClick={clearCells}
        >Clear Selected Cells</button>
    )
}
export default ClearCells;