import './FormCreateTarget.scss'
import React, {PureComponent} from 'react';
import {Button, Form, Input, Typography} from "antd";

class FormCreateTarget extends PureComponent {
    static defaultProps = {}

    handleClick = () => {
        const { createTarget } = this.props;
        const { getFieldsValue, setFieldsValue } = this.props.form;
        createTarget(getFieldsValue());
        setFieldsValue({
            sn: '',
            name: '',
            address: ''
        })
    };

    render() {
        const { onChange,  name, sn, address} = this.props;
        const {getFieldDecorator, getFieldsValue, setFieldsValue } = this.props.form;
        const {Title} = Typography;
        return (
            <Form layout="inline" className="FormCreateTarget">
                <Title level={3}>Create a target</Title>
                <Form.Item>
                    {getFieldDecorator('sn', {
                        rules: [{ required: true, message: 'Please input serial number!' }],
                    })(
                        <Input
                            name="sn"
                            placeholder="s/n"
                        />,
                    )}
                </Form.Item>
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
                    {getFieldDecorator('address', {
                        rules: [{ required: true, message: 'Please input address!' }],
                    })(
                        <Input
                            name="address"
                            placeholder="Address"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={this.handleClick} >Save</Button>
                </Form.Item>

            </Form>
            // <div className="FormCreateTarget">
            //     <input name="sn" onChange={onChange} value={sn} placeholder="serial number"/>
            //     <input name="name" onChange={onChange} value={name} placeholder="name"/>
            //     <input name="address" onChange={onChange} value={address} placeholder="address"/>
            //     <button onClick={onClick}>Create</button>
            // </div>
        )
    }
}


export default Form.create('CreateTarget')(FormCreateTarget)