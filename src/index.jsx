import React, {Component} from 'react';
import ReactDom from 'react-dom';

import Header from 'components/Header';
import FormContainer from "containers/FormContainer";
import CommentContainer from "containers/CommentContainer";

class App extends Component {
    render() {
        return (
            <div>
                <FormContainer/>
            </div>
        );
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('wrapper'),
);