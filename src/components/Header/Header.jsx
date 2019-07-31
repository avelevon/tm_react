import './Header.scss';

import React, {Component} from 'react';
import Menu from "components/Menu";

import routes from '../../routes';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: routes.map((route) => ({
                href: route.path,
                title: route.menuName,
            }))
        }
    }

    render() {
        const { items } = this.state;
        console.log()
        return (
            <div className="header">
                <Menu items={items}/>
            </div>
        )
    }
}