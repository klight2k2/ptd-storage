import React from 'react';
import { BarChartOutlined, HomeOutlined, DatabaseOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Image, Menu, Button, theme } from 'antd';
import { GrStorage } from 'react-icons/gr';
import { TiBook } from 'react-icons/ti';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    return (
        <div>
            <Image preview={false} src='/logo.png' alt='' className='mt-16' />

            <Menu
                mode='inline'
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <HomeOutlined />,
                        label: <NavLink to='home'>Home</NavLink>,
                    },
                    {
                        key: '2',
                        icon: <BarChartOutlined />,
                        label: <NavLink to='statistic'>Thống kê</NavLink>,
                    },
                    {
                        key: '3',
                        icon: <TiBook fontSize={24} />,
                        label: <NavLink to='recipe'>Quản lý công thức</NavLink>,
                    },
                    {
                        key: '4',
                        icon: <GrStorage />,
                        label: <NavLink to='fridge'>Quản lí tủ lạnh</NavLink>,
                        children: [
                            {
                                key: '4-1',
                                label: <NavLink to='fridge/ingredients'>Thực phẩm</NavLink>,
                            },
                            {
                                key: '4-2',
                                label: <NavLink to='fridge/category'>Category</NavLink>,
                            },
                            {
                                key: '4-3',
                                label: <NavLink to='fridge/history'>Lịch sử</NavLink>,
                            },
                           
                        ],
                    },
                ]}
            />
        </div>
    );
}
