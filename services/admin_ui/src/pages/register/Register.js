import React, { useState } from 'react';
import { Alert, Form, InputGroup } from 'react-bootstrap';

const Register = () => {
    const initialState = {
        fname: '',
        lname: '',
        email: '',
        password: '',
        confirmPassword: '',
        dob: '',
        gender: '',
        address: '',
        phone: '',
    };

    const [user, setUser] = useState(initialState);
    const [passwordError, setPasswordError] = useState('');

    const handleOnSubmit = (e) => {
        e.preventDefault();

        // Check for the password confirmation
        const { password, confirmPassword } = user;
        password !== confirmPassword &&
            setPasswordError('Password does not match!');
        console.log(user);
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        passwordError && name === 'confirmPassword' && setPasswordError('');
        setUser({
            ...user,
            [name]: value,
        });
    };

    return (
        <div className="mt-5 md:m-24 lg:m-50">
            <div className="text-center text-3xl text-purple-600 font-semibold drop-shadow-lg indent-1">
                Swapi-Swap Admin Registration
            </div>
            <Form
                onSubmit={handleOnSubmit}
                className="m-5 border-4 border-purple-800 rounded-lg p-4 drop-shadow-lg"
            >
                <Form.Group className="mb-3">
                    <Form.Label>First Name *</Form.Label>

                    <Form.Control
                        onChange={handleOnChange}
                        type="text"
                        name="fname"
                        placeholder="John"
                        required
                    />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name *</Form.Label>

                    <Form.Control
                        onChange={handleOnChange}
                        type="text"
                        name="lname"
                        placeholder="Doe"
                        required
                    />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                        onChange={handleOnChange}
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        onChange={handleOnChange}
                        type="text"
                        name="address"
                        placeholder="Address"
                    />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        onChange={handleOnChange}
                        type="text"
                        name="phone"
                        placeholder="Phone"
                    />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>DOB</Form.Label>

                    <Form.Control
                        onChange={handleOnChange}
                        type="date"
                        name="dob"
                    />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password *</Form.Label>
                    <Form.Control
                        onChange={handleOnChange}
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password *</Form.Label>
                    <Form.Control
                        onChange={handleOnChange}
                        type="password"
                        name="confirmPassword"
                        placeholder="Password"
                        required
                    />
                    {passwordError && (
                        <span className=" font-light underline border-red-600 text-red-600">
                            {passwordError}
                        </span>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <InputGroup className="">
                        {' '}
                        <InputGroup.Radio
                            name="gender"
                            defaultValue="male"
                            onChange={handleOnChange}
                        />
                        <span className="m-2">Male</span>
                        <InputGroup.Radio
                            name="gender"
                            defaultValue="female"
                            onChange={handleOnChange}
                        />
                        <span className="m-2">Female</span>
                    </InputGroup>
                </Form.Group>
                <hr />
                <button
                    className="content-center text-white bg-purple-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                    type="submit"
                >
                    Submit
                </button>
            </Form>
        </div>
    );
};

export default Register;
