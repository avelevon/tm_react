import './FormCreateUser.scss'
import React, {PureComponent} from 'react';

export default class FormCreateUser extends PureComponent {
    static defaultProps = {}
    
    render() {
        const { name, email, fieldChange, createUser } = this.props;
        return (
            <div className="FormCreateUser">
                <input name="name" onChange={fieldChange} value={name} placeholder="name"/>
                <input name="email" onChange={fieldChange} value={email} placeholder="email"/>
                <button onClick={createUser}>Create</button>
            </div>
        )
    }
}