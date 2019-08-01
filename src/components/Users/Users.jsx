import './Users.scss'
import React, {PureComponent} from 'react';

export default class Users extends PureComponent {

    render() {
        const {users, deleteUser} = this.props;
        return (
            <div className="Users">
                {users.map((user) =>
                    <ul key={user._id}>
                        <li>{user.name}</li>
                        <li>{user.email}</li>
                        <li className="delete-class"  onClick={() => deleteUser(user._id)}>Delete</li>
                    </ul>
                )}
            </div>
        )
    }
}
