const _= require('lodash')
const {Types} =require('mongoose')

const convertToObjectIdMongodb=id=> new Types.ObjectId(id)

const getInfoData=({fields=[],object=[]})=>{
    return _.pick(object,fields)
}

const getSelectData=(select=[])=>{
    return Object.fromEntries(select.map(el=>[el,1]))
}
const getUnSelectData=(select=[])=>{
    return Object.fromEntries(select.map(el=>[el,0]))
}

const removeUndefinedObject=obj=>{
    Object.keys(obj).forEach(k=>{
        if(obj[k]==null)
        delete obj[k]
    })
    return obj
}
const updateNestObjectParser= obj=>{
    const final={}
    console.log(`log 1::`,obj)
    Object.keys(obj).forEach(k=>{
        console.log(`3::`,k)
        console.log(`3::`,typeof obj[k]==='object')
        if(typeof obj[k]==='object' && !Array.isArray(obj[k])){
                const response=updateNestObjectParser(obj[k])
                console.log(`3.5::`,response)
                Object.keys(response).forEach(a=>{
                    console.log(`4::`,a)
                    final[`${k}.${a}`]=response[a]
                })
        }else{
            final[k]=obj[k]
        }
    })
    console.log(`log 2::`,final)

    return final
    // return obj
}

module.exports={
    getInfoData,
    getSelectData,
    getUnSelectData,
    removeUndefinedObject,
    updateNestObjectParser,
    convertToObjectIdMongodb
}