// import 'react-app-polyfill/ie9';
// import 'react-app-polyfill/stable';
import "@babel/polyfill";
// import 'whatwg-fetch';
// import 'promise-polyfill/src/polyfill';
require('es6-promise').polyfill();
require('isomorphic-fetch');
import smoothscroll from 'smoothscroll-polyfill';

// kick off the polyfill!
smoothscroll.polyfill();

import React, {PureComponent} from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import {Provider} from 'react-redux';

import routes from './routes';
import store from './store';
import HeaderClass from "components/Header";
import UserProfileContainer from "containers/UserProfileContainer";

class App extends PureComponent {

    render() {
        return (
            <div>
                <UserProfileContainer/>
                <HeaderClass/>
                <Switch>
                    {routes.map((route, idx) => <Route key={idx} {...route} />)}
                </Switch>
            </div>
        );
    }
}

ReactDom.render(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>,
    document.getElementById('wrapper')
);