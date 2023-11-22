const { BadRequestError } = require('../core/error.response');
const recipeModel = require('../models/recipe.model');
class RecipeService {
    static getAll = async ({user_id}) => {
        return recipeModel.find({user:user_id}).populate('recipe_ingredients.ingredient').lean();
    };
    static getLastestRecipe = async ({user_id}) => {
        return recipeModel.find({user:user_id}).sort({createdAt:-1}).limit(5).populate('recipe_ingredients.ingredient').lean();
    };

    static createRecipe = async ({ user_id, recipe }) => {
        let { recipe_name, recipe_description, image_url, recipe_ingredients,time_cook } = recipe;
        recipe_ingredients=JSON.parse(recipe_ingredients)
        const foundRecipe = await recipeModel.findOne({ recipe_name }).lean();
        console.log('foundRecipe', user_id);

        if (foundRecipe) throw new BadRequestError('Recipe already exists');

        const newRecipe = await recipeModel.create({ recipe_name, recipe_description, image_url, recipe_ingredients,time_cook, user: user_id });
        return newRecipe;
    };

    static updateRecipe = async ({ recipe_id, recipe }) => {
        let { recipe_name, recipe_description, image_url, recipe_ingredients,time_cook } = recipe;
        recipe_ingredients=JSON.parse(recipe_ingredients)

        const foundRecipe = await recipeModel.findByIdAndUpdate(recipe_id, { recipe_name, recipe_description, image_url, recipe_ingredients,time_cook });

        return foundRecipe;
    };

    static deleteRecipe = async ({ recipe_id }) => {
        const foundRecipe = await recipeModel.deleteOne({ _id: recipe_id });
        return foundRecipe;
    };
}

module.exports = RecipeService;
