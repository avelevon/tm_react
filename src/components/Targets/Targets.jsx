import './Targets.scss'
import React, {PureComponent} from 'react';

export default class Targets extends PureComponent {
    static defaultProps = {}
    
    render() {
        const { targets, deleteTarget } = this.props;
        return (
            <table className="Targets">
                <tbody>
                {targets.map((target) =>
                    <tr key={target._id}>
                        <td>{target.sn}</td>
                        <td>{target.name}</td>
                        <td>{target.address}</td>
                        <td className="delete-class"  onClick={() => deleteTarget(target._id)}>Delete</td>
                    </tr>
                )}
                </tbody>
            </table>
        )
    }
}