import './FormCreateUser.scss'
import React, {PureComponent} from 'react';
import {Button, Form, Input, Typography} from "antd";

class FormCreateUser extends PureComponent {
    static defaultProps = {}

    componentDidUpdate(prevState) {
        const { singleUser } = this.props;
        if (prevState.singleUser._id !== singleUser._id) {
            this.setChangeValues();
        }
    }

    handleClick = () => {
        const { createUser } = this.props;
        const { getFieldsValue, setFieldsValue } = this.props.form;
        createUser(getFieldsValue());
        setFieldsValue({
            name: '',
            email: '',
            password: ''
        })
    };

    setChangeValues = () => {
        const { singleUser } = this.props;
        const {setFieldsValue } = this.props.form;
        setFieldsValue({
            name: singleUser.name,
            email: singleUser.email,
            _id: singleUser._id,
        })
    }

    render() {

        const {getFieldDecorator, getFieldsValue, setFieldsValue } = this.props.form;
        const { Title } = Typography;
        return (
            <Form layout="inline" className="FormCreateUser">
                <Title level={3}>Create a user</Title>
                <Form.Item>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input name!' }],
                    })(
                        <Input
                            name="name"
                            placeholder="Name"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input name!' }],
                    })(
                        <Input
                            name="email"
                            placeholder="Email"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input name!' }],
                    })(
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('_id')(
                        <Input
                            type="hidden"
                            name="_id"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={this.handleClick} >Save</Button>
                </Form.Item>

            </Form>
        )
    }
}

export default Form.create('CreateUser')(FormCreateUser)