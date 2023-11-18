const { BadRequestError } = require('../core/error.response');
const logModel = require('../models/log.model');
class LogService {
    static getAll = async (fridge) => {
        return logModel.find({fridge}).sort({createdAt:-1}).populate({
            path:"log_import",
            populate:{
                path:"ingredient",
                model:"Ingredient"
            }
        }).lean();
    };

  
}

module.exports = LogService;
