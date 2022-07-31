import { requestPending, requestFail, responseSuccess } from './userSlice';
import { createUser } from '../../apis/userAPI';

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
