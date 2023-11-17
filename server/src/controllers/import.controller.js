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
            metadata: await ImportService.getExpiredImportIngredient({ fridge_id: req.query.fridge, date_exp: req.query?.dateExp }),
        }).send(res);
    };
    getExpiredSoonImportIngredient = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Successfully create ingredient',
            metadata: await ImportService.getExpiredImportIngredient({
                fridge_id: req.query.fridge,
                from_date: req.query?.fromDate,
                to_date: req.query?.toDate,
            }),
        }).send(res);
    };

    deleteIngredient = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Successfully delete ingredient',
            metadata: await ImportService.deleteImportIngredient({
                import_id: req.params.id,
            }),
        }).send(res);
    };
    getIngredientByFridge = async(req, res, next) => {
        return new SuccessResponse({
            message: "Ingredient detail",
            metadata: await ImportService.getIngredientByFridge({
                fridge_id: req.params.id,
            }),
        }).send(res);
    };

    updateImportIngredient = async (req, res, next) => {
        return new SuccessResponse({
            message: "Update imported ingredient successfully",
            metadata: await ImportService.updateImportIngredient({
                import_id: req.params.id,
                importIngredient: req.body,
            }),
        }).send(res);
    };

    filterImportIngredientByName = async(req, res, next) => {
        return new SuccessResponse({
            message: "Import ingredient information detail",
            metadata: await ImportService.filterImportIngredientByName({name: req.query}),
        }).send(res);
    };
    
}
module.exports = new IngredientController();
