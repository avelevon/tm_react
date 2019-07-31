import React, {Component} from 'react';
import ReactDom from 'react-dom';

import {Provider} from 'react-redux';

import store from './store';

import FormContainer from "containers/FormContainer";

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
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('wrapper'),
);