import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import {getLoggedUser as getUserProfile, reset as logoutUserAction} from 'actions/login';
import {Link} from "react-router-dom";
import {Button, Typography, Tag} from "antd";

class UserProfileContainer extends PureComponent {

    componentDidMount() {
        const {loadUserProfile} = this.props;
        loadUserProfile();
    }

    logoutHandle = (event) => {
        const {logoutUser} = this.props;
        event.preventDefault();
        localStorage.removeItem("token");
        logoutUser();
    }

    render() {
        const {currentUser} = this.props;
        if (currentUser.user === undefined) {
            currentUser.user = {
                'name': undefined
            }
        }
        const {Text} = Typography;
        return (
            <div className="currentUser">
                {currentUser.user.name === undefined ?
                    <Button ghost type="primary" size="small">
                        <Link className="signin" to={`/auth`}>Sign in</Link>
                    </Button> :
                    <Fragment>
                        <Tag color="geekblue">
                            <Link to={`/users/profile/${currentUser.user._id}`}>{currentUser.user.name}</Link>
                        </Tag>
                        <Button ghost type="primary" size="small">
                            <a className="signout" href="/" onClick={this.logoutHandle}>Sing out</a>
                        </Button>
                    </Fragment>

                }
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

