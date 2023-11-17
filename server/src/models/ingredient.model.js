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

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, ingredientSchema);
