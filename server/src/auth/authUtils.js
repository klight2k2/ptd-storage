const JWT = require("jsonwebtoken");
const { asyncHandler } = require("../helpers/asyncHandler");
const { NotFoundError, AuthFailureError } = require("../core/error.response");
const HEADER = {
    API_KEY: "x-api-key",
    FRIDGE: "fridge",
    AUTHORIZATION: "authorization",
};


const authentication = asyncHandler(async (req, res, next) => {
    /*
    1- check userId missing?
    2- get access token
    3- veriryToken
    4- check user in dbs
    5- check keyStore with userId
    6 Ok all -> next()
    */
    // const userId = req.headers[HEADER.CLIENT_ID];
    // if (!userId) throw new AuthFailureError("Invalid request");

    const accessToken = req.headers[HEADER.AUTHORIZATION];
    const fridge = req.headers[HEADER.FRIDGE];

    console.log(accessToken);
    try {
        const decodeUser = JWT.verify(accessToken, process.env.KEY);
        // if (userId !== decodeUser.userId)
        if(!decodeUser)
            throw new AuthFailureError("Invalid user");
        req.user = decodeUser;
        req.fridge=fridge;
        console.log(req.user);
        return next();
    } catch (error) {
        console.log(error);
        throw new AuthFailureError("Invalid user");
    }
});


const verifyJWT = async (token, secretKey) => {
    return await JWT.verify(token, secretKey);
};
module.exports = {  authentication, verifyJWT };
