import './Auth.scss'
import React, {PureComponent} from 'react';
import {authorization as authorizationAction} from 'actions/login'
import {connect} from "react-redux";
import {Button, Form, Icon, Input} from "antd";

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
        const { setFieldsValue } = this.props.form;
        const {getFieldsValue} =this.props.form;
        authorization({
            email: getFieldsValue().email,
            password: getFieldsValue().password,
        });
        setFieldsValue({
            email: '',
            password: '',
        })
    };

    onChangeHandle = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };

    render() {
        const {currentUser} = this.props;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <Form className="Auth">
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input
                            name="email"
                            onChange={this.onChangeHandle}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your password!' }],
                    })(
                        <Input
                            name="password"
                            type="password"
                            onChange={this.onChangeHandle}
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={this.onClickHandle}>
                        Log in
                    </Button>
                </Form.Item>

                {currentUser.error !== '' ? <div className="error">{currentUser.error.message}</div> : null}

            </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create('auth')(Auth))