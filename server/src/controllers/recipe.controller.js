const { SuccessResponse } = require('../core/success.response');
const RecipeService = require('../services/recipe.service');
class RecipeController {
    getAll = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Successfully get all recipe',
            metadata: await RecipeService.getAll({ user_id: req.user._id }),
        }).send(res);
    };
    createRecipe = async (req, res, next) => {
        console.log("hello",req.body)
        return new SuccessResponse({
            message: 'Successfully create recipe',
            metadata: await RecipeService.createRecipe({ user_id: req.user._id, recipe: { ...req.body,image_url:req?.file?.filename } }),
        }).send(res);
    };
    deleteRecipe = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Successfully delete recipe',
            metadata: await RecipeService.deleteRecipe({ recipe_id: req.params.id }),
        }).send(res);
    };

    getLastestRecipe = async (req, res, next) => {
        return new SuccessResponse({
            message: 'getLastestRecipe get all recipe',
            metadata: await RecipeService.getLastestRecipe({ user_id: req.user._id }),
        }).send(res);
    };
}
module.exports = new RecipeController();
