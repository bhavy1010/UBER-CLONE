import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RatingPage = () => {

    const navigate = useNavigate();

    const ride = JSON.parse(
        localStorage.getItem("currentRide")
    );

    const [comfort, setComfort] = useState(0);
    const [price, setPrice] = useState(0);
    const [safety, setSafety] = useState(0);
    const [behavior, setBehavior] = useState(0);
    const [overall, setOverall] = useState(0);

    const submitRating = async () => {

        try {

            await axios.post(
                `${import.meta.env.VITE_BASE_URL}/ratings/submit`,
                {
                    rideId: ride._id,
                    captainId: ride.captain._id,
                    comfort,
                    price,
                    safety,
                    behavior,
                    overall
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            localStorage.removeItem("currentRide");

            navigate("/home");

        } catch (error) {

            console.log(
                error.response?.data ||
                error.message
            );

        }

    };

    const renderStars = (
    value,
    setValue
) => {

    return (
        <div className="flex gap-2 justify-center">

            {[1, 2, 3, 4, 5].map((star) => (

                <button
                    key={star}
                    type="button"
                    onClick={() => setValue(star)}
                    className="text-4xl transition-all duration-200 hover:scale-110"
                >
                    {
                        star <= value
                            ? "⭐"
                            : "☆"
                    }
                </button>

            ))}

        </div>
    );
};

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-5">

                {/* Header */}

                <div className="text-center mb-6">

                    <div className="h-20 w-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-3">

                        <i className="ri-user-star-line text-4xl text-blue-600"></i>

                    </div>

                    <h1 className="text-2xl font-bold text-slate-800">
                        Rate Your Ride
                    </h1>

                    <p className="text-sm text-slate-500 mt-1">
                        Share your experience with the captain
                    </p>

                </div>

                {/* Captain Info */}

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 text-white mb-5">

                    <div className="flex items-center gap-3">

                        <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">

                            <i className="ri-user-3-fill text-xl"></i>

                        </div>

                        <div>

                            <p className="text-blue-100 text-xs">
                                Captain
                            </p>

                            <h3 className="font-semibold">
                                {ride?.captain?.fullname?.firstname || "Captain"}
                            </h3>

                        </div>

                    </div>

                </div>

                {/* Ratings */}

                <div className="space-y-4">

                    <div className="bg-slate-50 rounded-2xl p-4">

                        <h3 className="font-semibold text-slate-700 mb-2">
                            Comfort
                        </h3>

                        {renderStars(
                            comfort,
                            setComfort
                        )}

                    </div>

                    <div className="bg-slate-50 rounded-2xl p-4">

                        <h3 className="font-semibold text-slate-700 mb-2">
                            Price
                        </h3>

                        {renderStars(
                            price,
                            setPrice
                        )}

                    </div>

                    <div className="bg-slate-50 rounded-2xl p-4">

                        <h3 className="font-semibold text-slate-700 mb-2">
                            Safety
                        </h3>

                        {renderStars(
                            safety,
                            setSafety
                        )}

                    </div>

                    <div className="bg-slate-50 rounded-2xl p-4">

                        <h3 className="font-semibold text-slate-700 mb-2">
                            Captain Behavior
                        </h3>

                        {renderStars(
                            behavior,
                            setBehavior
                        )}

                    </div>

                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 text-white">

                        <h3 className="font-semibold mb-2">
                            Overall Rating
                        </h3>

                        {renderStars(
                            overall,
                            setOverall
                        )}

                    </div>

                </div>

                {/* Submit Button */}

                <button
                    onClick={submitRating}
                    className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-2xl shadow-lg active:scale-[0.98] transition-all"
                >
                    Submit Rating
                </button>

            </div>

        </div>
    );
};

export default RatingPage;