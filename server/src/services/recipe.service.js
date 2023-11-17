const { BadRequestError } = require('../core/error.response');
const recipeModel = require('../models/recipe.model');
class RecipeService {
    static getAll = async ({user_id}) => {
        return recipeModel.find({user:user_id}).populate('recipe_ingredients.ingredient').lean();
    };

    static createRecipe = async ({ user_id, recipe }) => {
        const { recipe_name, recipe_description, image_url, recipe_ingredients,time_cook } = recipe;
        const foundRecipe = await recipeModel.findOne({ recipe_name }).lean();
        console.log('foundRecipe', user_id);

        if (foundRecipe) throw new BadRequestError('Recipe already exists');

        const newRecipe = await recipeModel.create({ recipe_name, recipe_description, image_url, recipe_ingredients,time_cook, user: user_id });
        return newRecipe;
    };

    static updateRecipe = async ({ recipe_id, recipe }) => {
        const foundRecipe = await recipeModel.findByIdAndUpdate(recipe_id, recipe);

        return foundRecipe;
    };

    static deleteRecipe = async ({ recipe_id }) => {
        const foundRecipe = await recipeModel.deleteOne({ _id: recipe_id });
        return foundRecipe;
    };

    static filterRecipeByName = async({name}) => {
        const foundRecipe = await recipeModel.find({ recipe_name: { $regex: `^${name.q}`, $options: 'i' } }).exec();
        return foundRecipe;
    };
}

module.exports = RecipeService;
