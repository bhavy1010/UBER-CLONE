import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import quickRideLogo from "../assets/QuickRide-logo-white.jpeg";


const App = () => {

    const navigate = useNavigate();

    const [user, setUser] = useContext(UserDataContext);

    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = async (e) => {

        e.preventDefault();

        setIsLoading(true);
        setErrorMessage('');

        const data = {
            email,
            password
        };

        try {

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/users/login`,
                data
            );

            if (response.status === 200) {

                const responseData = response.data;

               localStorage.removeItem("captainToken");

                localStorage.setItem(
                    "token",
                    responseData.token
                );

                setUser(responseData.user);

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
                    "Connection failed. Please check your internet and try again."
                );

            }

        } finally {

            setIsLoading(false);

        }

        setUserData(data);

        setEmail('');
        setPassword('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 flex flex-col justify-between px-6 py-8">

            <div>

                <div className="mb-10">

                    <img
                                className="h-6"
                              src={quickRideLogo}
                              alt="QuickRide"
                          />

                    <h1 className="text-4xl font-bold text-gray-900">
                        Welcome Back
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Login to continue your journey
                    </p>

                </div>

                <form
                    onSubmit={submitHandler}
                    className="bg-white rounded-3xl shadow-lg p-5 border border-gray-100"
                >

                    <div className="mb-5">

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address
                        </label>

                        <input
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="w-full bg-gray-100 border border-gray-200 rounded-2xl px-4 py-4 text-base outline-none focus:border-black transition-all"
                            required
                            type="email"
                            placeholder="Enter your email"
                        />

                    </div>

                    <div className="mb-4">

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>

                        <input
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="w-full bg-gray-100 border border-gray-200 rounded-2xl px-4 py-4 text-base outline-none focus:border-black transition-all"
                            required
                            type="password"
                            placeholder="Enter password"
                        />

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
                        disabled={isLoading}
                        className="w-full bg-black text-white py-4 rounded-2xl font-semibold text-lg hover:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-5">

                        New here?

                        <Link
                            to="/signup"
                            className="font-semibold text-black ml-1"
                        >
                            Create Account
                        </Link>

                    </p>

                </form>

            </div>

            <div>

                <Link
                    to="/captain-login"
                    className="bg-[#FFD60A] text-black font-semibold rounded-2xl py-4 flex items-center justify-center shadow-md"
                >
                    Sign in as Captain 🚖
                </Link>

            </div>

        </div>
    );
};

export default App;