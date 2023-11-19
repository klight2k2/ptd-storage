import React, { useEffect } from 'react'
import { useState } from 'react'
import LogService from '../../services/LogService'
import { formatImageLink } from '../../utils/timeUtil'
import {Divider} from "antd"
import "./history.scss"

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

        return <>
        <div>
            <img className='history-img' src={formatImageLink(log.log_import.ingredient.image_url)} alt="" />
       
        <div className="history-info">
            
        </div>
        </div>
        <Divider/>
        </>

    })}


    </div>
  )
}
