import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import quickRideLogo from "../assets/QuickRide-logo-white.jpeg";

const UserSignup = () => {

    const navigate = useNavigate();

    const [user, setUser] = useContext(UserDataContext);

    const [errorMessage, setErrorMessage] = useState('');

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {

        e.preventDefault();

        const newUser = {
            fullname: {
                firstname,
                lastname
            },
            email,
            password
        };

        try {

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/users/register`,
                newUser
            );

            if (response.status === 201) {

                const data = response.data;

                localStorage.setItem(
                    'token',
                    data.token
                );

                setUser(data.user);

                navigate('/home');
            }

        } catch (error) {

            if (error.response?.data?.error) {

                setErrorMessage(
                    error.response.data.error
                );

            } else if (
                error.response?.data?.errors
            ) {

                setErrorMessage(
                    error.response.data.errors[0].msg
                );

            } else {

                setErrorMessage(
                    "Something went wrong"
                );

            }

        }

        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 flex flex-col justify-between px-6 py-8">

            <div>

                <div className="mb-8">

                    <img
                                className="h-6"
                              src={quickRideLogo}
                              alt="QuickRide"
                          />

                    <h1 className="text-4xl font-bold text-gray-900">
                        Create Account
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Start your ride journey today
                    </p>

                </div>

                <form
                    onSubmit={submitHandler}
                    className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5"
                >

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                    </label>

                    <div className="flex gap-3 mb-5">

                        <input
                            value={firstname}
                            onChange={(e) =>
                                setFirstname(e.target.value)
                            }
                            className="w-1/2 bg-gray-100 border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:border-black"
                            required
                            type="text"
                            placeholder="First Name"
                        />

                        <input
                            value={lastname}
                            onChange={(e) =>
                                setLastname(e.target.value)
                            }
                            className="w-1/2 bg-gray-100 border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:border-black"
                            type="text"
                            placeholder="Last Name"
                        />

                    </div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                    </label>

                    <input
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="w-full bg-gray-100 border border-gray-200 rounded-2xl px-4 py-4 mb-5 outline-none focus:border-black"
                        required
                        type="email"
                        placeholder="example@gmail.com"
                    />

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Create Password
                    </label>

                    <input
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="w-full bg-gray-100 border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:border-black"
                        required
                        type="password"
                        placeholder="Create strong password"
                    />

                    <div className="mt-3 mb-5 bg-yellow-50 border border-yellow-200 rounded-2xl p-3">

                        <p className="text-xs text-gray-700 font-medium">
                            Password must contain:
                        </p>

                        <ul className="text-xs text-gray-600 mt-2 space-y-1">
                            <li>✓ Minimum 8 characters</li>
                            <li>✓ One uppercase letter</li>
                            <li>✓ One lowercase letter</li>
                            <li>✓ One number</li>
                            <li>✓ One special character</li>
                        </ul>

                    </div>

                    {errorMessage && (

                        <div className="mb-4 rounded-2xl bg-red-50 border border-red-200 px-4 py-3">

                            <div className="flex items-center gap-2">

                                <i className="ri-error-warning-fill text-red-500"></i>

                                <p className="text-red-600 text-sm font-medium">
                                    {errorMessage}
                                </p>

                            </div>

                        </div>

                    )}

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-4 rounded-2xl font-semibold text-lg"
                    >
                        Create Account
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-5">

                        Already have an account?

                        <Link
                            to="/login"
                            className="font-semibold text-black ml-1"
                        >
                            Login
                        </Link>

                    </p>

                </form>

            </div>

            <div className="text-center">

                <p className="text-[11px] text-gray-500 leading-5 px-3">
                    By proceeding, you consent to receive calls,
                    WhatsApp messages and SMS from Uber and
                    its affiliates.
                </p>

            </div>

        </div>
    );
};

export default UserSignup;