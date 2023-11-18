const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Log';
const COLLECTION_NAME = 'Logs';

// Declare the Schema of the Mongo model
// log lại số lượng lấy ra
var logSchema = new mongoose.Schema(
    {
        log_type:{
            type:String,
            enum:["EXPORT","THROW","IMPORT"],
            required:true,
            index:true
        },
        log_amount: {
            type: Number,
        },
        log_import:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Import', 
        },
        fridge:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Fridge', 
        }

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
module.exports = mongoose.model(DOCUMENT_NAME, logSchema);
