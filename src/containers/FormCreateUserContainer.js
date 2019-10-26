import React, {PureComponent} from 'react';

import FormCreateUser from 'components/FormCreateUser';
import UsersContainer from "containers/UsersContainer";

import { connect } from 'react-redux';
import {add as addUser, update as updateUser} from "actions/users";
import {loadUser as loadUserAction} from "actions/users";

class FormCreateUserContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            _id: ''
        }
    };

    handleSendButton = (user) => {

        const { add, update } = this.props;

        if (user._id === '' || user._id === undefined) {
            add({
                name : user.name,
                email: user.email,
                password: user.password,
            });
        } else {
            update(user)
        }

        this.setState((prevState) => ({
            ...prevState,
            name: '',
            email: '',
            password: '',
        }));
    };

    changeUser = (userId) => {
        const {loadUser, singleUser} = this.props;
        loadUser(userId);
    };

    render() {
        const {clearFields, name, email, password, } = this.state;
        const { items, singleUser } = this.props;
        return (
            <div className="FormContainer">
                <FormCreateUser createUser={this.handleSendButton} clearFields={clearFields} singleUser={singleUser} />
                <UsersContainer users={items} changeUser={this.changeUser}/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        items: state.users.items,
        loading: state.users.loading,
        singleUser: state.users.singleUser,
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        add: (item) => dispatch(addUser(item)),
        update: (item) => dispatch(updateUser(item)),
        loadUser: (userId) => dispatch(loadUserAction(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormCreateUserContainer);