import './Users.scss'
import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {Table, Divider} from 'antd';

export default class Users extends PureComponent {

    render() {
        const {users, deleteUser, changeUser} = this.props;

        const { Column } = Table;

        return (
            <Table dataSource={users} rowKey="_id" >
                <Column  title="Name" dataIndex="name" key="name" render={(text, record) =>
                    // <Link to={`/users/${record._id}`}>{text}</Link>
                    <a >{text}</a>

                }/>
                <Column  title="Email" dataIndex="email" key="email"/>
                <Column  title="Actions" key="action" render={(text, record) => (
                    <span>
                        <a onClick={() => changeUser(record._id)}>Change</a>
                        <Divider type="vertical"/>
                        <a onClick={() => deleteUser(record._id)}>Delete</a>
                    </span>
                )}/>
            </Table>
        )
    }
}
