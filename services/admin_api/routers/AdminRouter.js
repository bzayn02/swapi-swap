import express from 'express';
import { createAdmin } from '../database/admin-model/Admin.model.js';
import { createAdminValidation } from '../middlewares/formValidation.middleware.js';
import { hashPassword } from '../helpers/bcrypt.helper.js';
import { createUniqueEmailConfirmation } from '../database/session/Session.model.js';
import { emailProcessor } from '../helpers/email.helper.js';

const Router = express.Router();

Router.all('/', (req, res, next) => {
    next();
});

Router.post('/', createAdminValidation, async (req, res) => {
    try {
        const hashPass = hashPassword(req.body.password);
        if (hashPass) {
            req.body.password = hashPass;
            const { _id, fname, email } = await createAdmin(req.body);
            if (_id) {
                const { pin } = await createUniqueEmailConfirmation(email);

                if (pin) {
                    const forSendingEmail = {
                        fname,
                        email,
                        pin,
                    };
                    emailProcessor(forSendingEmail);
                }
                return res.json({
                    status: 'success',
                    message:
                        'New admin has been successfully created! We have sent an email confirmation link to your email, please check and follow the instruction to activate the account. ',
                });
            }
        }
        res.json({
            status: 'error',
            message: 'Unable to create new admin!',
        });
    } catch (error) {
        console.log(error.message);
        let msg = 'Error, Unable to create new admin!';
        if (error.message.includes('E11000 duplicate key error collection')) {
            msg =
                'This email is already assigned to another user. Please try another one.';
        }
        res.json({
            status: 'error',
            message: msg,
        });
    }
});

export default Router;
