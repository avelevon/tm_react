import './Menu.scss'
import React, {PureComponent} from 'react';
import { Link, withRouter } from 'react-router-dom';

class Menu extends PureComponent {

    getActive = (href) => {
        const { location } = this.props;

        const substr = location.pathname.substr(0, href.length);

        if(href.length === 1 && location.pathname.length !== 1) {
            return '';
        }

        return substr === href ? 'active' : '';
    };

    render() {
        const { items, location } = this.props;
        return (
            <ul className="Menu">
                {items.map((item, idx) => <li className={this.getActive(item.href)} key={idx}><Link to={item.href}>{item.title}</Link></li>)}
            </ul>
        )
    }
}

export default withRouter(Menu);