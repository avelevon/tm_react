import './Users.scss'
import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';

export default class Users extends PureComponent {

    render() {
        const {users, deleteUser} = this.props;
        return (
            <div className="Users">
                {users.map((user, index) =>
                    <ul key={user._id}>
                        <li><Link to={`/users/${user._id}`}>{user.name}</Link></li>
                        <li>{user.email}</li>
                        <li className="delete-class"  onClick={() => deleteUser(user._id)}>Delete</li>
                    </ul>
                )}
            </div>
        )
    }
}
