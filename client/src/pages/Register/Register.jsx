import React from 'react';
import { Button, Form, Input, Image } from 'antd';

import './register.scss';
import { NavLink } from 'react-router-dom';
export default function Register() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='register-container'>
            <div className='register-bound'>
                <Image src='/logo.png'></Image>
                <Form
                    name='basic'
                    style={{
                        maxWidth: 600,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                >
                    <Form.Item
                        name='email'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input placeholder='Email' />
                    </Form.Item>

                    <Form.Item
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password  placeholder='Password'/>
                    </Form.Item>

                    <Form.Item
                        name='display_name'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your display name!',
                            },
                        ]}
                       
                    >
                        <Input  placeholder="Display Name"/>
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType='submit' block>
                            Submit
                        </Button>

                        Or <NavLink to="/login">Login now!</NavLink>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
