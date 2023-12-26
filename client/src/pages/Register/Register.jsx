import React, { useState } from 'react';
import { Button, Form, Input, Image } from 'antd';
import { FileAddOutlined, UploadOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';

import './register.scss';
import { NavLink } from 'react-router-dom';
import AuthService from '../../services/AuthService';
export default function Register() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [form]=Form.useForm()
    const onFinish = async (values) => {
        console.log('Success:', values);
         const res=await AuthService.signup(values)
         if(res){
            form.resetFields()
         }
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };

            reader.readAsDataURL(file);
        }
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
                    form={form}
                    style={{
                        maxWidth: 600,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                >
                    <Form.Item
                        name='email'
                        rules={[{ required: true, message: 'このフィールドは必須です。' }]}
                    >
                        <Input placeholder='メール' />
                    </Form.Item>

                    <Form.Item
                        name='password'
                        rules={[{ required: true, message: 'このフィールドは必須です。' }]}
                    >
                        <Input.Password  placeholder='パスワード' />
                    </Form.Item>

                    <Form.Item
                        name='display_name'
                        rules={[{ required: true, message: 'このフィールドは必須です。' }]}
                       
                    >
                        <Input  placeholder="名前"/>
                    </Form.Item>
                    {/* <Form.Item >
                        <input type='file' onChange={handleFileChange} id='file' style={{ display: 'none' }} />
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            {previewUrl && <img size={148} src={previewUrl} className='preview-avt'></img>}
                            {previewUrl && <br></br>}
                            <label htmlFor='file' className='upload-icon'>
                                <div className='upload-btn'>
                                    <UploadOutlined style={{ fontSize: '20px', cursor: 'pointer' }} /> アバターをアップロード
                                </div>
                            </label>
                        </div>
                    </Form.Item> */}

                    <Form.Item>
                        <Button type='primary' htmlType='submit' block>
                            登録
                        </Button>

                         <NavLink to="/login">ログイン!</NavLink>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
