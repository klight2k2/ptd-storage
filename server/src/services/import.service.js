const importModel = require('../models/import.model');
const mongoose = require('mongoose');
const { BadRequestError } = require('../core/error.response');
class ImportService {
    static getAll = async ({ fridge_id, is_delete = false }) => {
        return importModel.find({ fridge: fridge_id, is_delete }).populate('ingredient').lean();
    };

    static createImportIngredient = async ({ import_exp, orginal_amount, remain_amount, is_delete = false, fridge, ingredient }) => {
        const importIngredient = await importModel.create({ import_exp, orginal_amount, remain_amount, is_delete, fridge, ingredient });
        if (!importIngredient) throw new BadRequestError('Error when import');
        return importIngredient;
    };

    static updateImportIngredient = async ({ import_id, importIngredient }) => {
        const amountTaken = importIngredient.amount;
        const foundImport = await importModel.findById(import_id);
        const amountRemain = foundImport.remain_amount - amountTaken;
        if(amountRemain === 0){
            return await importModel.findByIdAndUpdate(import_id, {
                remain_amount: 0,
                is_delete: true,
            }, {new: true});
        } else {
            return await importModel.findByIdAndUpdate(import_id, {
                remain_amount: amountRemain,
            }, {new: true});
        }
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

    static getIngredientByFridge = async({fridge_id}) => {
        return await importModel
            .find({
                fridge: new mongoose.Types.ObjectId(fridge_id),
            }).exec();
    };

    static filterImportIngredientByName = async({name}) => {
        const foundImport = await importModel.find({
            'ingredient.ingredient_name': name.q,
        }).populate('ingredient', 'ingredient_name').exec();
        return foundImport;
    };
}

module.exports = ImportService;
