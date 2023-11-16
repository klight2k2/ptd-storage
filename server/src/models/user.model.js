const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        photo_url: String,
        display_name: String,
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

userSchema.find
//Export the model
module.exports = mongoose.model("User", userSchema);
