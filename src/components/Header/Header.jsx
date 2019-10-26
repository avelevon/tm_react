import './Header.scss';

import React, {PureComponent, Fragment} from 'react';
// import Menu from "components/Menu";
import {connect} from "react-redux";
import routes from '../../routes';
import {Layout, Menu, Tag} from 'antd';
import {Link} from "react-router-dom";

class HeaderClass extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            items: routes.map((route) => ({
                href: route.path,
                title: route.menuName,
            })).filter(item => item.title !== ''),
            current: location.pathname.slice(1) === '' ? "home" : location.pathname.slice(1),
        }
    }

    getCurrent = () => {
        this.setState({
            current: location.pathname.slice(1) === '' ? "home" : location.pathname.slice(1),
        })
    };

    render() {
        const {loadingUsers, loadingSchedules, loadingDates} = this.props;
        const {items, current} = this.state;
        const {Header} = Layout;
        return (
            <Fragment>
                <Header className="header">
                    <Menu theme="dark"
                          mode="horizontal"
                          selectedKeys={[current]}
                    >
                        {items.map((item) => item.title !== '' ? <Menu.Item onClick={this.getCurrent} key={item.title.toLowerCase()}><Link
                            to={item.href}>{item.title}</Link></Menu.Item> : null)}
                    </Menu>
                </Header>
                <Tag
                    visible={current === 'home'}
                    className="loading"
                    color={!loadingUsers && !loadingSchedules && !loadingDates ? 'green' : 'red'}>{!loadingUsers && !loadingSchedules && !loadingDates ? 'Loaded' : 'Loading...'}</Tag>
            </Fragment>
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

export default connect(mapStateToProps)(HeaderClass);