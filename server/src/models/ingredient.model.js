const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Ingredient';
const COLLECTION_NAME = 'Ingredients';

// Declare the Schema of the Mongo model
var ingredientSchema = new mongoose.Schema(
    {
        ingredient_name: {
            type: String,
            required: true,
            unique:true,
            index:true,

        },
        ingredient_unit: {
            type: String,
            required: true,
        },
        image_url: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);
const importModel =require("./import.model")

ingredientSchema.pre('remove',async (next)=>{
    console.log("ingredient id",this._id)
    await importModel.deleteMany({ingredient:this._id})
    next()
})
const recipeModel =require("./recipe.model")

ingredientSchema.pre('remove',async (next)=>{
    await recipeModel.deleteMany({ 'recipe_ingredients': { $elemMatch: { ingredient: this._id }}})
    next()
})

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, ingredientSchema);
