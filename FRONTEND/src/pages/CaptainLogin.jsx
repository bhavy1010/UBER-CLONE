import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';
import quickRideLogo from "../assets/QuickRide-logo-black.jpeg";

const App = () => {

    const navigate = useNavigate();

    const { captain, setCaptain } =
        useContext(CaptainDataContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData, setCaptainData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
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
                `${import.meta.env.VITE_BASE_URL}/captains/login`,
                data
            );

            if (response.status === 200) {

                const responseData = response.data;

                // localStorage.removeItem("token");

                localStorage.setItem(
                    "captainToken",
                    responseData.token
                );

                setCaptain(
                    responseData.captain
                );

                navigate("/captain-home");
            }

        } catch (error) {

            if (
                error.response?.data?.error
            ) {

                setErrorMessage(
                    error.response.data.error
                );

            }
            else if (
                error.response?.data?.errors
            ) {

                setErrorMessage(
                    error.response.data.errors[0].msg
                );

            }
            else {

                setErrorMessage(
                    "Connection failed. Please check your internet and try again."
                );

            }

        } finally {

            setIsLoading(false);

        }

        setCaptainData(data);

        setEmail('');
        setPassword('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black flex flex-col justify-between px-6 py-8">

            <div>

                <div className="mb-8">

                    <img
                                                    className="h-6"
                                                  src={quickRideLogo}
                                                  alt="QuickRide"
                                              />

                    <h1 className="text-4xl font-bold text-white">
                        Driver Login
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Welcome back Captain
                    </p>

                </div>

                <form
                    onSubmit={submitHandler}
                    className="bg-white rounded-3xl shadow-2xl p-5"
                >

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
                        placeholder="captain@gmail.com"
                    />

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                    </label>

                    <input
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="w-full bg-gray-100 border border-gray-200 rounded-2xl px-4 py-4 mb-4 outline-none focus:border-black"
                        required
                        type="password"
                        placeholder="Enter password"
                    />

                    {errorMessage && (

                        <div className="mb-4 bg-red-50 border border-red-200 rounded-2xl p-3">

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
                        className="w-full bg-black text-white py-4 rounded-2xl text-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Logging in...' : 'Login as Captain'}
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-5">

                        New Driver?

                        <Link
                            to="/captain-signup"
                            className="font-semibold text-black ml-1"
                        >
                            Register Now
                        </Link>

                    </p>

                </form>

            </div>

            <div className='mt-3 '>

                <Link
                    to="/login"
                    className="bg-[#FFD60A] text-black font-semibold rounded-2xl py-4 flex items-center justify-center shadow-xl"
                >
                    Continue as User 👤
                </Link>

            </div>

        </div>
    );
};

export default App;