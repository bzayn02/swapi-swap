import React from 'react';
import { Form } from 'react-bootstrap';

const Login = () => {
    const handleOnSubmit = (e) => {
        e.preventDefault();
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
    };
    return (
        <div className="mr-15 ml-15 mt-20 md:ml-30 md:mr-30 lg:ml-80 lg:mr-80">
            <div className="text-center text-3xl text-purple-600 font-semibold drop-shadow-lg indent-1">
                Login for Swapi-Swap Admin
            </div>
            <Form
                onSubmit={handleOnSubmit}
                className="m-5 border-4 border-purple-800 rounded-lg p-4 drop-shadow-lg"
            >
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        onChange={handleOnChange}
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        onChange={handleOnChange}
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                </Form.Group>

                <hr />
                <div className="flex items-center justify-center">
                    {' '}
                    <button
                        className="content-center text-white bg-purple-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                        type="submit"
                    >
                        Login
                    </button>
                </div>
                <a href="/registration">Register Now?</a>
            </Form>
        </div>
    );
};

export default Login;
