import Joi from 'joi';

const shortStr = Joi.string().max(20).required().alphanum();
const email = Joi.string().max(25).email({ minDomainSegments: 2 }).required();
export const createAdminValidation = (req, res, next) => {
    //server side validation
    const schema = Joi.object({
        fname: shortStr,
        lname: shortStr,
        email: email,
        password: Joi.string().min(8).required(),
        dob: Joi.date(),
        phone: Joi.string().max(15),
        address: Joi.string().max(100),
        gender: Joi.string().max(6),
    });

    const value = schema.validate(req.body);

    if (value.error) {
        return res.json({
            status: 'error',
            message: value.error.message,
        });
    }
    next();
};

export const adminEmailVerificationValidation = async (req, res, next) => {
    const schema = Joi.object({
        email: email,

        pin: Joi.string().min(6).required(),
    });

    const value = schema.validate(req.body);

    if (value.error) {
        return res.json({
            status: 'error',
            message: value.error.message,
        });
    }
    next();
};
