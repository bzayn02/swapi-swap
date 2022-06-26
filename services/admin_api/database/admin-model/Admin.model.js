import AdminSchema from './Admin.schema.js';

export const createAdmin = (newAdmin) => {
    try {
        const result = AdminSchema(newAdmin).save();
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

export const verifyEmail = (email) => {
    try {
        const result = AdminSchema.findOneAndUpdate(
            { email },
            { isEmailConfirmed: true },
            { new: true }
        );
        return result;
    } catch (error) {
        throw new Error(error);
    }
};
