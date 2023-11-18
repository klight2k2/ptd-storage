const express = require('express')
const accessController=require('../../controllers/access.controller')
const router=express.Router()
const {asyncHandler}= require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const importController = require('../../controllers/import.controller')
const recipeController = require('../../controllers/recipe.controller')
const logController = require('../../controllers/log.controller')
// sign up

router.get('/',authentication,asyncHandler(logController.getAll) )


module.exports = router