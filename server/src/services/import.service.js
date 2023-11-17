const importModel = require('../models/import.model');
const { BadRequestError } = require('../core/error.response');
class ImportService {
    static getAll = async ({fridge_id}) => {
        return importModel.find({fridge:fridge_id}).lean();
    };

    static createImportIngredient = async ({ import_exp, orginal_amount, remain_amount, import_is_delete = false, fridge, ingredient }) => {
        const importIngredient = await importModel.create({ import_exp, orginal_amount, remain_amount, import_is_delete, fridge, ingredient });
        if(!importIngredient)  throw new BadRequestError("Error when import")
        return importIngredient;
    };

    static updateImportIngredient = async ({ import_id, importIngredient }) => {
        const foundImportIngredient = await ingredientModel.findByIdAndUpdate(import_id, importIngredient);

        return foundImportIngredient;
    };

    static deleteImportIngredient  = async ({ import_id }) => {
        const foundImportIngredient = await ingredientModel.deleteOne({ _id: import_id });
        return foundImportIngredient;
    };
    static getExpiredImportIngredient = async ({ fridge_id }) => {
        const currentDate= new Date();
        return importModel.find({fridge:fridge_id,
            import_exp:{
                $lte:currentDate
            }
        }).lean();
    }
}

module.exports = ImportService;
