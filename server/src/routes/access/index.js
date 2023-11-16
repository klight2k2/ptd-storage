const express = require('express')
const accessController=require('../../controllers/access.controller')
const router=express.Router()
const {asyncHandler}= require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')
// sign up

router.post('/auth/signup',asyncHandler(accessController.signUp) )
router.post('/auth/login',asyncHandler(accessController.login) )
router.post('/auth/test',authentication,(req,res,next)=>{
    res.json({success:true})
} )


module.exports = router