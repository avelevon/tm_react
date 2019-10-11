import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {getLoggedUser as getUserProfile, reset as logoutUserAction} from 'actions/login';
import {Link} from "react-router-dom";

class UserProfileContainer extends PureComponent {

    componentDidMount() {
        const {loadUserProfile} = this.props;
        loadUserProfile();
    }

    onClickHandle = (event) => {
        const {logoutUser} = this.props;
        event.preventDefault();
        localStorage.removeItem("token");
        logoutUser();
    }

    render() {
        const {currentUser} = this.props;
        return (
            <div className="currentUser">
                {currentUser.error === '' ?  currentUser.user.name === undefined ?
                        <Link className="signin" to={`/auth`}>Sign in</Link> :
                        <p><span>Logged user: <Link to={`/users/profile/${currentUser.user._id}`}>{currentUser.user.name}</Link></span> <a className="signout" href="/" onClick={this.onClickHandle}>Sing out</a></p>
                : <span>ERROR: {currentUser.error.message}</span>}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer)

