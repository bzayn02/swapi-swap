import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Spinner } from 'react-bootstrap';
import { userEmailVerification } from '../register/userAction';

const EmailVerification = () => {
    const dispatch = useDispatch();

    const { isPending, userRegistrationResponse } = useSelector(
        (state) => state.user
    );

    const params = new URLSearchParams(useLocation().search);
    const pin = params.get('pin');
    const email = params.get('email');

    useEffect(() => {
        //send pin and email to api server
        dispatch(userEmailVerification({ pin, email }));
    }, []);
    return (
        <div>
            <div className="max-w-md mx-auto mt-3">
                {isPending && <Spinner variant="primary" animation="border" />}
                {userRegistrationResponse?.message && (
                    <Alert
                        variant={
                            userRegistrationResponse?.status === 'success'
                                ? 'success'
                                : 'danger'
                        }
                    >
                        {userRegistrationResponse?.message}
                    </Alert>
                )}
                {userRegistrationResponse?.status === 'success' && (
                    <a
                        className="mx-auto no-underline hover:underline text-xl font-light"
                        href="/"
                    >
                        Login Now
                    </a>
                )}
            </div>
        </div>
    );
};

export default EmailVerification;
