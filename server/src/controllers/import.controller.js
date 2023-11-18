const { SuccessResponse } = require('../core/success.response');
const ImportService = require('../services/import.service');
class IngredientController {
    getAllImportIngredient = async (req, res, next) => {
        return new SuccessResponse({
            message: 'get all import ingredient successfully',
            metadata: await ImportService.getAll({ fridge_id: req.fridge }),
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
            metadata: await ImportService.getExpiredImportIngredient({ fridge_id: req.fridge, date_exp: req.query?.dateExp }),
        }).send(res);
    };
    getExpiredSoonImportIngredient = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Successfully create ingredient',
            metadata: await ImportService.getExpiredImportIngredient({
                fridge_id: req.fridge,
                from_date: req.query?.fromDate,
                to_date: req.query?.toDate,
            }),
        }).send(res);
    };

    throwImportIngredient = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Successfully delete ingredient',
            metadata: await ImportService.throwImportIngredient({
                import_id: req.params.id,
            }),
        }).send(res);
    };

    takeImportIngredient = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Successfully delete ingredient',
            metadata: await ImportService.takenImportIngredientById({
                ...req.body,
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
}
module.exports = new IngredientController();
