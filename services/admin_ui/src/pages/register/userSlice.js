import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isPending: false,
    userRegistrationResponse: {},
};
const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        requestPending: (state) => {
            state.isPending = true;
        },
        requestFail: (state, { payload }) => {
            state.isPending = true;
            state.userRegistrationResponse = payload;
        },
    },
});

const { reducer, actions } = userSlice;
export default reducer;
