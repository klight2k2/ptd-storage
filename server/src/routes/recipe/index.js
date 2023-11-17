const express = require('express')
const accessController=require('../../controllers/access.controller')
const router=express.Router()
const {asyncHandler}= require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const importController = require('../../controllers/import.controller')
const recipeController = require('../../controllers/recipe.controller')
// sign up

router.get('/',authentication,asyncHandler(recipeController.getAll) )
router.post('/',authentication,asyncHandler(recipeController.createRecipe) )
router.delete('/:id',authentication,asyncHandler(recipeController.deleteRecipe) )
router.get('/filter', asyncHandler(recipeController.filterRecipeByName))

module.exports = router