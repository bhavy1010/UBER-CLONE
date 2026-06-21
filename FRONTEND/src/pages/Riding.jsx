import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LiveMap from '../components/LiveMap';

const Riding = () => {

    const navigate = useNavigate();

    const [ride, setRide] = useState(null);

    useEffect(() => {

        const storedRide =
            localStorage.getItem("currentRide");

        if (storedRide) {
            setRide(JSON.parse(storedRide));
        }

    }, []);

    const handlePayment = async () => {

        if (!ride) return;

        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/payments/create-order`,
            {
                amount: ride.fare
            }
        );

        const order = response.data;

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "Uber Clone",
            description: "Ride Payment",
            order_id: order.id,

            handler: function () {

            alert("Payment Successful");

            navigate("/rating", {
                state: {
                    rideId: ride._id,
                    captainId: ride.captain._id
                }
            });
},
            theme: {
                color: "#000000"
            }
        };

        const razorpay = new window.Razorpay(options);

        razorpay.open();
    };

    return (
    <div className="relative h-screen overflow-hidden bg-slate-100">

        {/* MAP */}

        {ride && (
            <div className="absolute inset-0 z-0">
                <LiveMap
                    pickup={[
                        ride?.pickupCoordinates?.lat,
                        ride?.pickupCoordinates?.lng
                    ]}
                    destination={[
                        ride?.destinationCoordinates?.lat,
                        ride?.destinationCoordinates?.lng
                    ]}
                />
            </div>
        )}

        {/* HEADER */}

        <div className="absolute top-4 left-4 right-4 z-20">

            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-lg px-4 py-3 flex items-center justify-between">

                <div>

                    <h2 className="font-bold text-slate-800">
                        Ride In Progress
                    </h2>

                    <p className="text-xs text-slate-500">
                        Heading to destination
                    </p>

                </div>

                <Link
                    to="/home"
                    className="h-10 w-10 rounded-2xl bg-slate-100 flex items-center justify-center"
                >
                    <i className="ri-home-4-line text-lg text-slate-700"></i>
                </Link>

            </div>

        </div>

        {/* BOTTOM SHEET */}

        <div className="absolute bottom-0 left-0 right-0 z-20 max-h-[45vh]">

            <div className="bg-white rounded-t-[30px] shadow-2xl px-4 pt-3 pb-4 overflow-y-auto max-h-[45vh]">

                <div className="flex justify-center mb-2">

                    <div className="w-14 h-1.5 bg-slate-300 rounded-full"></div>

                </div>

                {/* DRIVER CARD */}

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-3 text-white shadow-lg mb-3">

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                                <i className="ri-user-3-fill text-lg"></i>
                            </div>

                            <div>

                                <p className="text-blue-100 text-[11px]">
                                    Driver
                                </p>

                                <h3 className="font-semibold text-sm">
                                    {ride?.captain?.fullname?.firstname || "Captain"}
                                </h3>

                            </div>

                        </div>

                        <div className="text-right">

                            <h3 className="font-bold text-sm">
                                {ride?.captain?.vehicle?.plate || "Vehicle"}
                            </h3>

                            <p className="text-blue-100 text-[11px]">
                                {ride?.captain?.vehicle?.color} {ride?.captain?.vehicle?.vehicleType}
                            </p>

                        </div>

                    </div>

                </div>

                {/* PICKUP */}

                <div className="bg-white border border-slate-200 rounded-2xl p-2.5 shadow-sm mb-2">

                    <div className="flex gap-3">

                        <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                            <i className="ri-map-pin-user-fill text-green-600 text-sm"></i>
                        </div>

                        <div>

                            <p className="text-[10px] uppercase text-slate-400 font-semibold">
                                Pickup
                            </p>

                            <h3 className="text-sm font-medium text-slate-800 mt-1">
                                {ride?.pickup}
                            </h3>

                        </div>

                    </div>

                </div>

                {/* DESTINATION */}

                <div className="bg-white border border-slate-200 rounded-2xl p-2.5 shadow-sm mb-2">

                    <div className="flex gap-3">

                        <div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                            <i className="ri-map-2-line text-red-500 text-sm"></i>
                        </div>

                        <div>

                            <p className="text-[10px] uppercase text-slate-400 font-semibold">
                                Destination
                            </p>

                            <h3 className="text-sm font-medium text-slate-800 mt-1">
                                {ride?.destination}
                            </h3>

                        </div>

                    </div>

                </div>

                {/* FARE */}

                <div className="bg-blue-600 rounded-2xl p-3 text-white shadow-lg mb-3">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-blue-100 text-[11px]">
                                Total Fare
                            </p>

                            <h2 className="text-xl font-bold mt-1">
                                ₹{ride?.fare || 0}
                            </h2>

                        </div>

                        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                            <i className="ri-wallet-3-line"></i>
                        </div>

                    </div>

                </div>

                {/* NOTICE */}

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-2.5 mb-3">

                    <p className="text-[11px] text-yellow-800">
                        Complete payment after reaching destination.
                    </p>

                </div>

                {/* PAYMENT BUTTON */}

                <button
                    onClick={handlePayment}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-2.5 rounded-2xl shadow-lg"
                >
                    Make Payment
                </button>

            </div>

        </div>

    </div>
);
};

export default Riding;