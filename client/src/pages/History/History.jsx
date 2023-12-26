import React, { useEffect } from 'react'
import { useState } from 'react'
import LogService from '../../services/LogService'
import { convertToDateISO, formatImageLink } from '../../utils/timeUtil'
import {Divider, Tag} from "antd"
import "./history.scss"
const actions={
    "THROW":{
        value:"捨てる",
        color:'red'
    },
    "IMPORT":{
        value:"インポート",
        color:'green'
    },
    "EXPORT":{
        value:"取る",
        color:'purple'
    },
    
}
export default function History() {

    const [logs,setLogs]= useState([])

    const handleGetLog=async ()=>{
        const res= await LogService.getLogs()
        if(res) setLogs(res)
    }

    useEffect(()=>{ handleGetLog()},[])


  return (
    <div className='history-container'><h3>ログ</h3>
    
    {logs.map(log=>{
        const ingredient=log?.log_import?.ingredient
        return <>
        <div className='history'>
            <img className='history-img' src={formatImageLink(log.log_import.ingredient.image_url)} alt="" />
       
        <div className="history-info">
            <p className='history-action'>材料: { ingredient.ingredient_name}</p>
            <p>量:  {log.log_amount}</p>
            <p >アクション: <Tag color={actions[log.log_type].color}> {actions[log.log_type].value} </Tag> </p>
            <p>作成日: {convertToDateISO(log.createdAt)}</p>
        </div>
        </div>
        <Divider/>
        </>

    })}


    </div>
  )
}
