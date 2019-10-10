import React, {PureComponent} from 'react';

import FormCreateUser from 'components/FormCreateUser';
import UsersContainer from "containers/UsersContainer";

import { connect } from 'react-redux';
import {add as addUser} from "actions/users";

class FormCreateUserContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
        }
    };

    handleFieldChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };

    handleSendButton = () => {
        const { add } = this.props;
        add({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        });

        this.setState((prevState) => ({
            ...prevState,
            name: '',
            email: '',
            password: '',
        }));
    };

    render() {
        const {clearFields, name, email, password} = this.state;
        const { items } = this.props;
        return (
            <div className="FormContainer">
                <FormCreateUser createUser={this.handleSendButton} fieldChange={this.handleFieldChange} clearFields={clearFields} name={name} email={email} password={password}/>
                <UsersContainer users={items}/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        items: state.users.items,
        loading: state.users.loading,
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        add: (item) => dispatch(addUser(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormCreateUserContainer);