const { SuccessResponse } = require('../core/success.response');
const IngredientService = require('../services/ingredient.service');
class IngredientController {
    getAllIngredient = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Successfully code generation',
            metadata: await IngredientService.createDiscountCode({
                ...req.body,
                shopId: req.user.userId,
            }),
        }).send(res);
    };
  
}
module.exports = new IngredientController();
