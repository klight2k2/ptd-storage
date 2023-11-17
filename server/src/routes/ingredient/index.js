const express = require('express')
const accessController=require('../../controllers/access.controller')
const router=express.Router()
const {asyncHandler}= require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const ingredientController = require('../../controllers/ingredient.controller')


router.post('/',asyncHandler(ingredientController.createIngredient))
router.get('/',asyncHandler(ingredientController.getAllIngredient))
router.get('/:id', asyncHandler(ingredientController.getIngredientById))
router.put('/:id',asyncHandler(ingredientController.updateIngredient))
router.delete('/:id',asyncHandler(ingredientController.deleteIngredient))


module.exports = router