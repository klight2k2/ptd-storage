const express = require('express')
const accessController=require('../../controllers/access.controller')
const router=express.Router()
const {asyncHandler}= require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const ingredientController = require('../../controllers/ingredient.controller')
const storage = require('../../utils/storage')


router.post('/',storage,asyncHandler(ingredientController.createIngredient))
router.get('/',asyncHandler(ingredientController.getAllIngredient))
router.put('/:id',asyncHandler(ingredientController.updateIngredient))
router.delete('/:id',asyncHandler(ingredientController.deleteIngredient))


module.exports = router