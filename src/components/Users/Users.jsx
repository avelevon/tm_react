import './Users.scss'
import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';

export default class Users extends PureComponent {

    render() {
        const {users, deleteUser} = this.props;
        return (
            <table className="Users">
                <tbody>
                {users.map((user, index) =>
                    <tr key={user._id}>
                        <td><Link to={`/users/${user._id}`}>{user.name}</Link></td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td className="delete-class"  onClick={() => deleteUser(user._id)}>Delete</td>
                    </tr>
                )}
                </tbody>
            </table>
        )
    }
}
