const { SuccessResponse } = require('../core/success.response');
const LogService = require('../services/log.service');
class LogController {
    getAll = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Successfully get all recipe',
            metadata: await LogService.getAll(req.fridge),
        }).send(res);
    };
   
}
module.exports = new LogController();
