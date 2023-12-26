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
        const image_url=req?.file?.filename ||req.body?.image_url
        return new SuccessResponse({
            message: 'レシピの作成が成功しました',
            metadata: await RecipeService.createRecipe({ user_id: req.user._id, recipe: { ...req.body,image_url } }),
        }).send(res);
    };
    updateRecipe = async (req, res, next) => {
        const image_url=req?.file?.filename ||req.body?.image_url
        return new SuccessResponse({
            message: 'レシピの更新が成功しました',
            metadata: await RecipeService.updateRecipe({ recipe_id: req.params.id, recipe: { ...req.body,image_url } }),
        }).send(res);
    };
    deleteRecipe = async (req, res, next) => {
        return new SuccessResponse({
            message: 'レシピの削除が成功しました',
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
