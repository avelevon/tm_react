import './Targets.scss'
import React, {PureComponent} from 'react';

export default class Targets extends PureComponent {
    static defaultProps = {}
    
    render() {
        const { targets, deleteTarget } = this.props;
        return (
            <div className="Targets">
                {targets.map((target) =>
                    <ul key={target._id}>
                        <li>{target.sn}</li>
                        <li>{target.name}</li>
                        <li>{target.address}</li>
                        <li className="delete-class"  onClick={() => deleteTarget(target._id)}>Delete</li>
                    </ul>
                )}
            </div>
        )
    }
}