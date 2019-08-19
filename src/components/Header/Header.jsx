import './Header.scss';

import React, {PureComponent, Fragment} from 'react';
import Menu from "components/Menu";
import {connect} from "react-redux";
import routes from '../../routes';

class Header extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            items: routes.map((route) => ({
                href: route.path,
                title: route.menuName,
            })).filter(item => item.title !== '')
        }
    }

    render() {
        const { loadingUsers, loadingSchedules, loadingDates} = this.props;
        const { items } = this.state;
        return (
            <div className="header">
                <Menu items={items}/>
                <div
                    className={!loadingUsers && !loadingSchedules && !loadingDates ? 'loaded' : 'loading'}>{!loadingUsers && !loadingSchedules && !loadingDates ? 'Loaded' : 'Loading...'}</div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        loadingUsers: state.users.loading,
        loadingSchedules: state.schedules.loading,
        loadingDates: state.dates.loading,
    }
};

export default connect(mapStateToProps)(Header);