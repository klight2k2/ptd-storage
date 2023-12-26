import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import { Tooltip, Avatar, Space, Button, Dropdown, Input, Badge } from 'antd';
import { NavLink, createSearchParams, useNavigate } from 'react-router-dom';


import "./navbar.scss"

export default function Navbar() {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('acess_token');
        setCurrentUser(null);
    };
    const items = [
        {
            label: (
                <NavLink to='/' onClick={() => logout()}>
                    ログアウト
                </NavLink>
            ),
            key: '2',
        },
    ];
    return (
        <div className='navbar'>
            <Dropdown
                className='avatar'
                placement='bottomRight'
                menu={{
                    items,
                }}
            >
                <Space>
                    <Avatar src={currentUser?.photo_url} style={{ verticalAlign: 'middle' }} size='default'>
                        {/* hello */}
                    </Avatar>
                    <p>{currentUser.display_name}</p>
                </Space>
            </Dropdown>
        </div>
    );
}
