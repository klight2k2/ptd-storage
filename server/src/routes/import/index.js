const express = require('express')
const accessController=require('../../controllers/access.controller')
const router=express.Router()
const {asyncHandler}= require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const importController = require('../../controllers/import.controller')
// sign up

router.get('/filter', asyncHandler(importController.filterImportIngredientByName))
router.post('/',asyncHandler(importController.createImportIngredient) )
router.get('/',asyncHandler(importController.getAllImportIngredient) )
router.get('/:id',asyncHandler(importController.getIngredientByFridge))
router.get('/expired',asyncHandler(importController.getExpiredImportIngredient) )
router.get('/exprire-soon',asyncHandler(importController.getExpiredImportIngredient) )
router.put('/:id',asyncHandler(importController.updateImportIngredient))



module.exports = router