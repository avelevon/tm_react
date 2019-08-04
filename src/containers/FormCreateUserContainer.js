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
        });

        this.setState((prevState) => ({
            ...prevState,
            name: '',
            email: '',
        }));
    };

    render() {
        const {clearFields, name, email} = this.state;
        const { items } = this.props;
        return (
            <div className="FormContainer">
                <FormCreateUser createUser={this.handleSendButton} fieldChange={this.handleFieldChange} clearFields={clearFields} name={name} email={email}/>
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