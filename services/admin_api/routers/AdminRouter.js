import express from 'express';
import {
    createAdmin,
    verifyEmail,
} from '../database/admin-model/Admin.model.js';
import {
    adminEmailVerificationValidation,
    createAdminValidation,
} from '../middlewares/formValidation.middleware.js';
import { hashPassword } from '../helpers/bcrypt.helper.js';
import {
    createUniqueEmailConfirmation,
    deleteInfo,
    findAdminEmailVerification,
} from '../database/session/Session.model.js';
import {
    sendEmailVerificationLink,
    sendEmailVerificationConfirmation,
} from '../helpers/email.helper.js';

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
                    sendEmailVerificationLink(forSendingEmail);
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

// Email verification
Router.patch(
    '/email-verification',
    adminEmailVerificationValidation,
    async (req, res) => {
        try {
            const result = await findAdminEmailVerification(req.body);
            if (result?._id) {
                const data = await verifyEmail(result?.email);
                if (data?._id) {
                    // delete the session info
                    deleteInfo(req.body);
                    sendEmailVerificationConfirmation({
                        fname: data.fname,
                        email: data.email,
                    });
                    return res.json({
                        status: 'success',
                        message:
                            'Success! Your email has now been verified. You may login now.',
                    });
                }
            }
            res.json({
                status: 'error',
                message:
                    'Error, Unable to verify the email, either the link is invalid or expired.',
            });
        } catch (error) {
            res.json({
                status: 'error',
                message:
                    'Error, Unable to verify the email, please try again later.',
            });
        }
    }
);

export default Router;
