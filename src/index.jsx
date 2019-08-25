// import 'react-app-polyfill/ie9';
// import 'react-app-polyfill/stable';
import "@babel/polyfill";
import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';
import smoothscroll from 'smoothscroll-polyfill';

// kick off the polyfill!
smoothscroll.polyfill();

import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import {Provider} from 'react-redux';
import {DndProvider} from "react-dnd-cjs";
import HTML5Backend from "react-dnd-html5-backend-cjs";

import routes from './routes';
import store from './store';
import Header from "components/Header";

class App extends Component {

    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    {routes.map((route, idx) => <Route key={idx} {...route} />)}
                </Switch>
            </div>
        );
    }
}

ReactDom.render(
    <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </DndProvider>,
    document.getElementById('wrapper')
);