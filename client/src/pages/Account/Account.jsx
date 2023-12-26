import React, { useEffect, useState } from 'react'
import AuthService from '../../services/AuthService'
import {Table} from 'antd'
const columns = [
  {
    title: '名前',
    dataIndex: 'display_name',
    key: 'display_name',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'メール',
    dataIndex: 'email',
    key: 'email',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'パスワード',
    dataIndex: 'password',
    key: 'password',
    render: (text) => <p>{text}</p>,
  },
]
export default function Account() {
  const [listUser,setListUser]=useState()
  
  const handleGetUser= async ()=>{
    const users= await AuthService.getAllUser()
    setListUser(users)
    console.log("account", users)

  }
  useEffect(()=>{
    handleGetUser()
    console.log(listUser)
  },[])
  return (
    <div>
      <h3>アカウント管理</h3>

<Table columns={columns} dataSource={listUser?.map((item,id)=>{ return {key:id,...item}})} />
    </div>
  )
}
