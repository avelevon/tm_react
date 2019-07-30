import React, {PureComponent} from 'react';

import Form from 'components/Form';
import CommentContainer from "containers/CommentContainer";

export default class FormContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            'author': '',
            'comment': '',
            'item': [
                {
                    'author': '',
                    'comment': '',
                }
            ]
        }
    };

    handleFieldChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };

    handleSendButton = () => {
        this.setState((prevState) => ({
            ...prevState,
            'item': [
                {
                    'author': this.state.author,
                    'comment': this.state.comment,
                }
            ],
            'author': '',
            'comment': '',
        }));
    };

    render() {
        const {item, clearFields, author, comment} = this.state;
        return (
            <div className="FormContainer">
                <Form onComment={this.handleSendButton} fieldChange={this.handleFieldChange} clearFields={clearFields} author={author} comment={comment}/>
                <CommentContainer item={item}/>
            </div>
        )
    }

}