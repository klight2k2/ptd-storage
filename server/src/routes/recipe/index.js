const express = require('express')
const accessController=require('../../controllers/access.controller')
const router=express.Router()
const {asyncHandler}= require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const importController = require('../../controllers/import.controller')
const recipeController = require('../../controllers/recipe.controller')
const storage = require('../../utils/storage')
// sign up

router.get('/',authentication,asyncHandler(recipeController.getAll) )
router.get('/lastest',authentication,asyncHandler(recipeController.getLastestRecipe) )
router.post('/',authentication,(storage),asyncHandler(recipeController.createRecipe) )
router.post('/:id',authentication,(storage),asyncHandler(recipeController.updateRecipe) )
router.delete('/:id',authentication,asyncHandler(recipeController.deleteRecipe) )

module.exports = router