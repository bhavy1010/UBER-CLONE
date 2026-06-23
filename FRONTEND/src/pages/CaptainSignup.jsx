import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';
import quickRideLogo from "../assets/QuickRide-logo-black.jpeg";

const CaptainSignup = () => {

    const navigate = useNavigate();

    const { captain, setCaptain } = useContext(CaptainDataContext);

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = async (e) => {

        e.preventDefault();

        setIsLoading(true);
        setErrorMessage('');

        const captainData = {
            fullname: {
                firstname,
                lastname
            },
            email,
            password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: Number(vehicleCapacity),
                vehicleType
            }
        };

        try {

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/captains/register`,
                captainData
            );

            if (response.status === 201) {

                const data = response.data;

                localStorage.setItem('captainToken', data.token);

                setCaptain(data.captain);

                navigate('/captain-home');
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

        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black px-6 py-8">

            <div className="max-w-md mx-auto">

                <img
                                                className="h-6"
                                              src={quickRideLogo}
                                              alt="QuickRide"
                                          />

                <h1 className="text-4xl font-bold text-white">
                    Become a Driver
                </h1>

                <p className="text-gray-400 mt-2 mb-8">
                    Create your captain account and start earning.
                </p>

                <form
                    onSubmit={submitHandler}
                    className="bg-white rounded-3xl p-5 shadow-2xl"
                >

                    <h3 className="text-lg font-bold mb-4">
                        Personal Information
                    </h3>

                    <div className="flex gap-3 mb-4">

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

                    <input
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="w-full bg-gray-100 border border-gray-200 rounded-2xl px-4 py-4 mb-4 outline-none focus:border-black"
                        required
                        type="email"
                        placeholder="Email Address"
                    />

                    <input
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="w-full bg-gray-100 border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:border-black"
                        required
                        type="password"
                        placeholder="Create Password"
                    />

                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-3 mt-3 mb-5">

                        <p className="font-semibold text-sm">
                            Password Requirements
                        </p>

                        <ul className="text-xs text-gray-600 mt-2 space-y-1">
                            <li>✓ Minimum 8 characters</li>
                            <li>✓ One uppercase letter</li>
                            <li>✓ One lowercase letter</li>
                            <li>✓ One number</li>
                            <li>✓ One special character</li>
                        </ul>

                    </div>

                    <h3 className="text-lg font-bold mb-4">
                        Vehicle Information
                    </h3>

                    <div className="space-y-3">

                        <input
                            value={vehicleColor}
                            onChange={(e) =>
                                setVehicleColor(e.target.value)
                            }
                            className="w-full bg-gray-100 border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:border-black"
                            required
                            type="text"
                            placeholder="Vehicle Color"
                        />

                        <input
                            value={vehiclePlate}
                            onChange={(e) =>
                                setVehiclePlate(e.target.value)
                            }
                            className="w-full bg-gray-100 border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:border-black"
                            required
                            type="text"
                            placeholder="Vehicle Plate Number"
                        />

                        <input
                            value={vehicleCapacity}
                            onChange={(e) =>
                                setVehicleCapacity(e.target.value)
                            }
                            className="w-full bg-gray-100 border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:border-black"
                            required
                            type="number"
                            placeholder="Passenger Capacity"
                        />

                        <select
                            value={vehicleType}
                            onChange={(e) =>
                                setVehicleType(e.target.value)
                            }
                            className="w-full bg-gray-100 border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:border-black"
                            required
                        >
                            <option value="">
                                Select Vehicle Type
                            </option>

                            <option value="car">
                                🚗 Car
                            </option>

                            <option value="bike">
                                🏍️ Bike
                            </option>

                            <option value="auto">
                                🛺 Auto
                            </option>

                        </select>

                    </div>

                    {errorMessage && (

                        <div className="mt-4 bg-red-50 border border-red-200 rounded-2xl p-3">

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
                        className="w-full bg-black text-white py-4 rounded-2xl text-lg font-semibold mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Creating Account...' : 'Create Captain Account'}
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-5">

                        Already have an account?

                        <Link
                            to="/captain-login"
                            className="text-black font-semibold ml-1"
                        >
                            Login
                        </Link>

                    </p>

                </form>

                <p className="text-center text-xs text-gray-500 mt-6 px-4">
                    By proceeding, you agree to receive calls,
                    WhatsApp messages and SMS from Uber and its
                    affiliates.
                </p>

            </div>

        </div>
    );
};

export default CaptainSignup;