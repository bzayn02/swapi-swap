import mongoose from 'mongoose';

const sessionSchema = mongoose.Schema(
    {
        pin: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            max: 50,
        },
        type: {
            type: String,
            default: 'emailVerification',
            max: 50,
        },
    },
    {
        timestamps: true,
    }
);

const session = mongoose.model('Session', sessionSchema);
export default session;
