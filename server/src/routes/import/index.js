const express = require('express')
const accessController=require('../../controllers/access.controller')
const router=express.Router()
const {asyncHandler}= require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const importController = require('../../controllers/import.controller')
// sign up

router.post('/',asyncHandler(importController.createImportIngredient) )
router.get('/',asyncHandler(importController.getAllImportIngredient) )
router.get('/expired',asyncHandler(importController.getExpiredImportIngredient) )


module.exports = router