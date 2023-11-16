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
        orginal_amount: {
            type: String,
            required: true,
        },
        remain_amount: {
            type: String,
            required: true,
        },
        import_status: {
            type: String,
            required: true,
        },
        fridge: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Fridge', 
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, importSchema);
