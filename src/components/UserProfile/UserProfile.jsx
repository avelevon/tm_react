import './UserProfile.scss'
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {getLoggedUser as getUserProfile, reset as logoutUserAction} from "actions/login";
import {Card} from "antd";

class UserProfile extends PureComponent {
    static defaultProps = {}

    componentDidMount() {
        const {loadUserProfile, currentUser} = this.props;
        if (currentUser.user.name === undefined) {
            loadUserProfile();
        }
    }

    render() {
        const { currentUser } = this.props;
        return (
            <Card className="UserProfile">
                <p>Name: {currentUser.user.name} </p>
                <p>Email: {currentUser.user.email} </p>
            </Card>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        currentUser: state.loggedUser,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserProfile: () => dispatch(getUserProfile()),
        logoutUser: () => dispatch(logoutUserAction()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)