import { requestPending, requestFail, responseSuccess } from './userSlice';
import { createUser, verifyNewUser } from '../../apis/userAPI';

export const userRegister = (newUser) => async (dispatch) => {
    dispatch(requestPending());
    console.log(newUser);

    // call api
    const result = await createUser(newUser);
    result?.status === 'success'
        ? dispatch(responseSuccess(result))
        : dispatch(requestFail(result));

    // dispatch response
};
export const userEmailVerification = (userObj) => async (dispatch) => {
    dispatch(requestPending());

    // call api
    const result = await verifyNewUser(userObj);
    console.log(result);
    result?.status === 'success'
        ? dispatch(responseSuccess(result))
        : dispatch(requestFail(result));

    // dispatch response
};
