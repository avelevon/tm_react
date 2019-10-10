import './FormCreateUser.scss'
import React, {PureComponent} from 'react';

export default class FormCreateUser extends PureComponent {
    static defaultProps = {}
    
    render() {
        const { name, email, password, fieldChange, createUser } = this.props;
        return (
            <div className="FormCreateUser">
                <input name="name" onChange={fieldChange} value={name} placeholder="name"/>
                <input name="email" onChange={fieldChange} value={email} placeholder="email"/>
                <input name="password" onChange={fieldChange} value={password} placeholder="password"/>
                <button onClick={createUser}>Save</button>
            </div>
        )
    }
}