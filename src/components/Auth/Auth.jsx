import './Auth.scss'
import React, {PureComponent} from 'react';
import {authorization as authorizationAction} from 'actions/login'
import {connect} from "react-redux";

class Auth extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    componentDidUpdate() {
        const {loggedUser} = this.props;
    }

    onClickHandle = () => {
        const {email, password} = this.state;
        const {authorization, currentUser} = this.props;
        authorization({
            email: email,
            password: password,
        });
    };

    onChangeHandle = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };
    
    render() {
        const {email, password} = this.state;
        const { currentUser} = this.props;

        return (
            <div className="Auth">
                <input name="email" onChange={this.onChangeHandle} value={email} placeholder="email"/>
                <input name="password" onChange={this.onChangeHandle} value={password} placeholder="password"/>
                <button onClick={this.onClickHandle}>Send</button>
                {currentUser.error !== '' ? <div className="error">{currentUser.error.message}</div> : null}
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
        authorization: (item) => dispatch(authorizationAction(item)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth)