const { SuccessResponse } = require('../core/success.response');
const ImportService = require('../services/import.service');
class IngredientController {
    getAllImportIngredient = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Successfully code generation',
            metadata: await ImportService.getAll({ fridge_id: req.query.fridge }),
        }).send(res);
    };

    createImportIngredient = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Successfully create ingredient',
            metadata: await ImportService.createImportIngredient({
                ...req.body,
            }),
        }).send(res);
    };
    getExpiredImportIngredient = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Successfully create ingredient',
            metadata: await ImportService.getExpiredImportIngredient({ fridge_id: req.query.fridge }),
        }).send(res);
    };
    // updateIngredient = async (req, res, next) => {
    //     return new SuccessResponse({
    //         message: 'Successfully update ingredient',
    //         metadata: await IngredientService.up({
    //             ingredient_id: req.params.id,
    //             ingredient: req.body,
    //         }),
    //     }).send(res);
    // };

    deleteIngredient = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Successfully delete ingredient',
            metadata: await ImportService.deleteImportIngredient({
                import_id: req.params.id,
            }),
        }).send(res);
    };
}
module.exports = new IngredientController();
