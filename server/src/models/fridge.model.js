const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Fridge';
const COLLECTION_NAME = 'Fridges';

// Declare the Schema of the Mongo model
var fridgeSchema = new mongoose.Schema(
    {
        fridge_name: {
            type: String,
            required: true,
        },
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Ingredient' // Reference tới model Ingredient
        // },
    
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, fridgeSchema);
