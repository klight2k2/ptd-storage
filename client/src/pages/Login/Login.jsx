import React, { useContext, useEffect } from 'react';
import { Button, Form, Input, Image } from 'antd';

import './login.scss';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import AuthSerivce from '../../services/AuthService';
export default function Login() {
    const { currentUser, setCurrentUser } = useContext(AuthContext);

    const navigate = useNavigate();
    useEffect(()=>{
        if (currentUser) {
            console.log(currentUser)
            return navigate('/home');
        }

    },[currentUser])
    const onFinish = async (userForm) => {
        console.log('Success:', userForm);
        const userInfo = await AuthSerivce.login(userForm);
        console.log('User:', userInfo);
        if (userInfo) {
            localStorage.setItem('access_token', userInfo.access_token);
            localStorage.setItem('user', JSON.stringify(userInfo.user));
            localStorage.setItem('fridge',userInfo.user.fridge);
            setCurrentUser(userInfo.user);
            return navigate('/home');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='login-container'>
            <div className='login-bound'>
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
                        <Input.Password placeholder='Password' />
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType='submit' block>
                            Submit
                        </Button>
                        Or <NavLink to='/register'>Register now!</NavLink>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
