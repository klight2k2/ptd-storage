const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Import';
const COLLECTION_NAME = 'Imports';

// Declare the Schema of the Mongo model
var importSchema = new mongoose.Schema(
    {
        import_exp: {
            type: Date,
            required: true,
        },
        note: {
            type: String,
        },
        original_amount: {
            type: Number,
            required: true,
        },
        remain_amount: {
            type: Number,
            required: true,
        },
        is_delete: {
            type: Boolean,
            required: true,
        },
        fridge: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Fridge', 
        },
        ingredient:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredient', 
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, importSchema);
