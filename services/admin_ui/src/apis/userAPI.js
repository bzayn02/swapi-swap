import axios from 'axios';

const rootURL = 'http://localhost:8001/api/v1';
const userAPI = rootURL + '/admin';
const verifyUserAPI = userAPI + '/email-verification';

export const createUser = async (newUser) => {
    try {
        const { data } = await axios.post(userAPI, newUser);
        return data;
    } catch (error) {
        console.log(error);
        return {
            status: 'error',
            message: error.message,
        };
    }
};

export const verifyNewUser = async (info) => {
    try {
        const { data } = await axios.patch(verifyUserAPI, info);
        return data;
    } catch (error) {
        console.log(error);
        return {
            status: 'error',
            message: error.message,
        };
    }
};
