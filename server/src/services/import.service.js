const importModel = require('../models/import.model');
const { BadRequestError, NotFoundError } = require('../core/error.response');
const logModel = require('../models/log.model');
class ImportService {
    static getAll = async ({ fridge_id, is_delete = false }) => {
        return importModel.find({ fridge: fridge_id, is_delete }).populate('ingredient').lean();
    };

    static createImportIngredient = async ({ import_exp, orginal_amount, is_delete = false, fridge, ingredient ,note}) => {
        const importIngredient = await importModel.create({ import_exp, orginal_amount, remain_amount:original_amount, is_delete, fridge, ingredient,note });

        if (!importIngredient) throw new BadRequestError('Error when import');
        await logModel.create({ log_type: 'IMPORT', log_import: importIngredient._id, fridge: fridge ,log_amount:orginal_amount});
        return importIngredient;
    };

    static updateImportIngredient = async ({ import_id, importIngredient }) => {
        const foundImportIngredient = await ingredientModel.findByIdAndUpdate(import_id, importIngredient);

        return foundImportIngredient;
    };

    static deleteImportIngredient = async ({ import_id }) => {
        const foundImportIngredient = await ingredientModel.deleteOne({ _id: import_id });
        return foundImportIngredient;
    };

    static getExpiredImportIngredient = async ({ fridge_id, date_exp = null }) => {
        let currentDate = new Date();
        if (date_exp !== null) currentDate = new Date(date_exp);
        return importModel
            .find({
                fridge: fridge_id,
                is_delete:false,
                import_exp: {
                    $lte: currentDate,
                },
            })
            .populate('ingredient')
            .lean();
    };

    static getExpiredSoonImportIngredient = async ({ fridge_id, from_date, to_date, is_delete = false }) => {
        const fromDate = new Date();
        const toDate = new Date();
        if (from_date) fromDate = new Date(from_date);
        if (to_date) toDate = new Date(to_date);
        return await importModel
            .find({
                fridge: fridge_id,
                is_delete,
                import_exp: {
                    $lte: toDate,
                    $gte: fromDate,
                },
            })
            .populate('ingredient')
            .lean();
    };

    static takenImportIngredientById = async ({ import_id, take_amount }) => {
        const foundImportIngredient = await importModel.findById(import_id);
        if (!foundImportIngredient) throw new NotFoundError('Import ingredient not found: ' + import_id);
        console.log( take_amount)
        if (foundImportIngredient.remain_amount > take_amount) {
            await importModel.findByIdAndUpdate(import_id, { $inc: { remain_amount: -take_amount } });
            const taken = await logModel.create({ log_import: import_id, log_amount: take_amount, log_type: 'EXPORT', fridge: foundImportIngredient.fridge });
            return taken;
        }
        thr;
        throw new NotFoundError('Import ingredient not sufficient: ' + import_id);
    };

    static throwImportIngredient = async ({ import_id }) => {
        const foundImportIngredient = await importModel.findByIdAndUpdate(import_id, { is_delete: true });
        if (!foundImportIngredient) throw new NotFoundError('Import ingredient not found: ' + import_id);

        const taken = await logModel.create({
            log_import: import_id,
            log_amount: foundImportIngredient.remain_amount,
            log_type: 'THROW',
            fridge: foundImportIngredient.fridge,
        });
        return taken;
    };


    static statisticIngredient = async ({ fridge }) => {
        let statistic={}
        const importList=await importModel.find({
            is_delete:false,
            fridge:fridge,
            remain_amount:{
                $gte:0
            }
        }).populate("ingredient").lean()
        importList.map(item=>{
            statistic[item.ingredient.ingredient_name]={
                name:item.ingredient.ingredient_name,
                expired:0,
                useable:0,
                unit:item.ingredient.ingredient_unit
            }
        })
        importList.map(item=>{
            const currentDate= new Date()
            const expDate= new Date(item.import_exp)
          
            if(currentDate> expDate){
                statistic[item.ingredient.ingredient_name].expired+=item.remain_amount
            }else{
                statistic[item.ingredient.ingredient_name].useable+=item.remain_amount

            }
        })
        statistic= Object.values(statistic)
        return statistic

    }
}

module.exports = ImportService;
