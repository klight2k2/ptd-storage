const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Recipe';
const COLLECTION_NAME = 'Recipes';

// Declare the Schema of the Mongo model
var recipeSchema = new mongoose.Schema(
    {
        recipe_name: {
            type: String,
            required: true,
        },
        recipe_description: {
            type: String,
            required: true,
        },
        image_url: {
            type: String,
            required: true,
        },
        recipe_ingredients: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredient' // Reference tới model Ingredient
          }],
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, recipeSchema);
