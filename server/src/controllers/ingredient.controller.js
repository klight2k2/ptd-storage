const { SuccessResponse } = require('../core/success.response');
const IngredientService = require('../services/ingredient.service');
class IngredientController {
    getAllIngredient = async (req, res, next) => {
        return new SuccessResponse({
            // message: 'Successfully code generation',
            metadata: await IngredientService.getAll(),
        }).send(res);
    };

    createIngredient = async (req, res, next) => {
        return new SuccessResponse({
            message: 'カテゴリーの作成が成功しました',
            metadata: await IngredientService.createIngredient({ ...req.body,image_url:req?.file?.filename }),
        }).send(res);
    };
    updateIngredient = async (req, res, next) => {
        return new SuccessResponse({
            message: 'update catgory successfully ',
            metadata: await IngredientService.updateIngredient({
                ingredient_id: req.params.id,
                ingredient: req.body,
            }),
        }).send(res);
    };

    deleteIngredient = async (req, res, next) => {
        return new SuccessResponse({
            message: 'delete category successfully',
            metadata: await IngredientService.deleteIngredient({
                ingredient_id: req.params.id,
            }),
        }).send(res);
    };
   
}
module.exports = new IngredientController();
