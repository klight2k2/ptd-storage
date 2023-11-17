const ingredientModel = require('../models/ingredient.model');
const { BadRequestError } = require('../core/error.response');
class IngredientService {
    static getAll = async () => {
        return ingredientModel.find({}).lean();
    };

    static createIngredient = async ({ ingredient_name, ingredient_unit, image_url }) => {
        const foundIngredient = await ingredientModel.findOne({ ingredient_name }).lean();
        console.log('foundIngredient', foundIngredient);

        if (foundIngredient) throw new BadRequestError('Ingredient already exists');

        const newIngredient = await ingredientModel.create({ ingredient_name, ingredient_unit, image_url });
        return newIngredient;
    };

    static updateIngredient = async ({ ingredient_id, ingredient }) => {
        const foundIngredient = await ingredientModel.findByIdAndUpdate(ingredient_id, ingredient);

        return foundIngredient;
    };

    static deleteIngredient = async ({ ingredient_id }) => {
        const foundIngredient = await ingredientModel.deleteOne({_id: ingredient_id});
        return foundIngredient;
    };
}

module.exports = IngredientService;
