import React, {PureComponent} from 'react';

import Users from "components/Users";

import {connect} from 'react-redux';

import {load as loadUsers} from 'actions/users';
import {deleteSingleUser} from 'actions/users';

class UsersContainer extends PureComponent {

    componentDidMount() {
        const {load} = this.props;
        load();
    }

    render() {
        const {users, deleteUser} = this.props;
        return (
            <div className="Users">
                <Users users={users} deleteUser={deleteUser} />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        users: state.users.items,
        loading: state.users.loading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        load: () => dispatch(loadUsers()),
        deleteUser: (id) => dispatch(deleteSingleUser(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)

