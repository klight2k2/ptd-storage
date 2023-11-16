const mongoose=require('mongoose')
const os = require('os')
const process = require('process')
const _SECONDS=5000
const countConnect=()=>{
    const numConnection=mongoose.connections.length
    console.log(`Number of connection::${numConnection}`)

}

const checkOVerload=()=>{
    setInterval((()=>{

        const numConnection=mongoose.connections.length
        const numCore=os.cpus().length;
        const memoryUsage=process.memoryUsage().rss;
        
        const maxConnections=numCore*5;

        console.log(`Active connection::${numConnection}`)
        console.log(`Memory usage:: ${memoryUsage/1024/1024} MB`)
        if(numConnection>=maxConnections){
            console.log(`Connection overload detectes!`)
        }
    }),_SECONDS)
}

module.exports={
    countConnect,
    checkOVerload
}