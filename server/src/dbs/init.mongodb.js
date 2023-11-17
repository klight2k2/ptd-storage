const mongoose = require('mongoose')

const {db:{host,name,port}}=require('../configs/config.mongodb')
const {countConnect}=require('../helpers/check.connect')


const connectString=`mongodb://${host}:${port}/${name}`
// const connectString=`mongodb+srv://quangpmwork:2YymY4ZJkDzjkk4@cluster0.4zxqrog.mongodb.net/?retryWrites=true&w=majority`

class Database{
    constructor(){
        this.connect()
    }

    connect(type='mongodb') {
        if(1===1){
            mongoose.set('debug', true)
            mongoose.set('debug', {color:true})
        }
        mongoose.connect(connectString,{
            maxPoolSize:50
        }).then(_=>console.log(`Connected Mongodb success`))
        .catch(err=>console.log(`Error connecting`,err))
    }

    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instanceMongoDb=Database.getInstance()
module.exports=instanceMongoDb