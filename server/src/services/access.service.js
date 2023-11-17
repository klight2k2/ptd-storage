const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const { getInfoData } = require('../utils');
const { BadRequestError, AuthFailureError, ForbiddenError } = require('../core/error.response');
const jwt = require("jsonwebtoken");
const fridgeModel = require('../models/fridge.model');
class AccessService {
    static login = async ({ email, password }) => {
        const foundUser = await userModel.findOne({
            email: email,
        });
        if (!foundUser) throw new BadRequestError(`User not registered!`);
        console.log(`founded`, foundUser);
        const match = bcrypt.compare(password, foundUser.password);
        if (!match) throw new AuthFailureError('Authentication error');

        const access_token = jwt.sign( getInfoData({ fields: ['_id', 'display_name', 'email', 'photo_url','fridge'], object: foundUser }), process.env.KEY);
        return {
            user: getInfoData({ fields: ['_id', 'display_name', 'email', 'photo_url','fridge'], object: foundUser }),
            access_token,
        };
    };

    static signUp = async ({ display_name, email, password }) => {
        try {
            const holderUser = await userModel.findOne({ email }).lean();

            if (holderUser) {
                throw new BadRequestError('Error: User already registered');
            }
            const passwordHash = await bcrypt.hash(password, 10);
            const newFridge= await fridgeModel.create({fridge_name:`fridge ${email}`})
            const newUser = await userModel.create({ display_name, email, password: passwordHash,fridge:newFridge._id });
            const access_token = jwt.sign( getInfoData({ fields: ['_id', 'display_name', 'email', 'photo_url','fridge'], object: newUser }), process.env.KEY);
            console.log("$",newUser)
            if (newUser) {
                return {
                    code: 201,
                    metadata: {
                        user: getInfoData({ fields: ['_id', 'display_name', 'email', 'photo_url','fridge'], object: newUser }),
                        access_token,
                    },
                };
            }
            return {
                code: 200,
                metadata: null,
            };
        } catch (error) {
            console.log(error);
            return {
                code: 'xxx',
                message: error.message,
                status: 'error',
            };
        }
    };
}

module.exports = AccessService;