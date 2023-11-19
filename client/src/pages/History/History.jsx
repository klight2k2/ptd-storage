import React, { useEffect } from 'react'
import { useState } from 'react'
import LogService from '../../services/LogService'
import { convertToDateISO, formatImageLink } from '../../utils/timeUtil'
import {Divider, Tag} from "antd"
import "./history.scss"
const actions={
    "THROW":{
        value:"Vứt bỏ",
        color:'red'
    },
    "IMPORT":{
        value:"cho vào",
        color:'green'
    },
    "EXPORT":{
        value:"Lấy ra",
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
    <div className='history-container'><h3>Lịch sử</h3>
    
    {logs.map(log=>{
        const ingredient=log.log_import.ingredient
        return <>
        <div className='history'>
            <img className='history-img' src={formatImageLink(log.log_import.ingredient.image_url)} alt="" />
       
        <div className="history-info">
            <p className='history-action'>Nguyên liệu: { ingredient.ingredient_name}</p>
            <p>Khối lượng:  {log.log_amount}</p>
            <p >Trạng thái <Tag color={actions[log.log_type].color}> {actions[log.log_type].value} </Tag> </p>
            <p>Ngày thực hiện: {convertToDateISO(log.createdAt)}</p>
        </div>
        </div>
        <Divider/>
        </>

    })}


    </div>
  )
}
