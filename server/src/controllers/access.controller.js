const { CREATED, SuccessResponse }=require('../core/success.response')
const AccessService= require('../services/access.service')
class AccessController{
    signUp=async (req,res,next)=>{
            console.log(`[p]::signUp`,req.body)
            new CREATED({
                message:"Registered OK",
                metadata:await AccessService.signUp(req.body)
            }).send(res)
          
    }

    login= async (req,res,next)=>{
        new SuccessResponse({
            metadata:await AccessService.login(req.body)
        }).send(res)
    }
  
}

module.exports =new AccessController()