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

    componentDidUpdate(prevState) {
        const {singleUser} = this.props;
        if (prevState.singleUser._id !== singleUser._id) {
            this.setState((prevState) => ({
                ...prevState,
                name: singleUser.name,
                email: singleUser.email,
                password: '',
                _id: singleUser._id
            }));
        }
    }

    handleFieldChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };

    handleSendButton = () => {
        const { add, update } = this.props;
        const user = this.state;
        if (user._id === '') {
            add(user);
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
        const { items } = this.props;
        return (
            <div className="FormContainer">
                <FormCreateUser createUser={this.handleSendButton} fieldChange={this.handleFieldChange} clearFields={clearFields} name={name} email={email} password={password}/>
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