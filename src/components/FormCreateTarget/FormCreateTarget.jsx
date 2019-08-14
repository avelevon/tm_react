import './FormCreateTarget.scss'
import React, {PureComponent} from 'react';

export default class FormCreateTarget extends PureComponent {
    static defaultProps = {}
    
    render() {
        const { onChange, onClick, name, sn, address} = this.props;
        return (
            <div className="FormCreateTarget">
                <input name="sn" onChange={onChange} value={sn} placeholder="serial number"/>
                <input name="name" onChange={onChange} value={name} placeholder="name"/>
                <input name="address" onChange={onChange} value={address} placeholder="address"/>
                <button onClick={onClick}>Create</button>
            </div>
        )
    }
}