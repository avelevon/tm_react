import React, {PureComponent} from 'react';

import Form from 'components/Form';
import CommentsContainer from "containers/CommentsContainer";

import { connect } from 'react-redux';
import {loadSingle} from "actions/comments";

class FormContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            body: '',
        }
    };

    handleFieldChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };

    handleSendButton = () => {
        const { load } = this.props;

        load({
            name: this.state.name,
            body: this.state.body,
        });

        this.setState((prevState) => ({
            ...prevState,
            name: '',
            body: '',
        }));
    };

    render() {
        const {clearFields, name, body} = this.state;
        const { items } = this.props;
        return (
            <div className="FormContainer">
                <Form onComment={this.handleSendButton} fieldChange={this.handleFieldChange} clearFields={clearFields} name={name} body={body}/>
                <CommentsContainer items={items}/>
            </div>
        )
    }

}

function mapStateToProps(state, props) {

    return {
        items: state.comments.items,
        loading: state.comments.loading,
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        load: (item) => dispatch(loadSingle(item)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);