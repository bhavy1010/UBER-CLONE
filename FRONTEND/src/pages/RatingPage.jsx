import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RatingPage = () => {

    const navigate = useNavigate();

    const ride =
        JSON.parse(
            localStorage.getItem("currentRide")
        );

    const [comfort, setComfort] = useState(5);
    const [price, setPrice] = useState(5);
    const [safety, setSafety] = useState(5);
    const [behavior, setBehavior] = useState(5);
    const [overall, setOverall] = useState(5);

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
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            localStorage.removeItem(
                "currentRide"
            );

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
            <div className="flex gap-2 text-3xl">

                {[1,2,3,4,5].map((star) => (

                    <span
                        key={star}
                        onClick={() =>
                            setValue(star)
                        }
                        className="cursor-pointer"
                    >
                        {
                            star <= value
                            ? "⭐"
                            : "☆"
                        }
                    </span>

                ))}

            </div>
        );
    };

    return (
        <div className="p-5">

            <h1 className="text-3xl font-bold mb-8">
                Rate Your Ride
            </h1>

            <div className="space-y-6">

                <div>
                    <h3>Comfort</h3>
                    {renderStars(
                        comfort,
                        setComfort
                    )}
                </div>

                <div>
                    <h3>Price</h3>
                    {renderStars(
                        price,
                        setPrice
                    )}
                </div>

                <div>
                    <h3>Safety</h3>
                    {renderStars(
                        safety,
                        setSafety
                    )}
                </div>

                <div>
                    <h3>Captain Behavior</h3>
                    {renderStars(
                        behavior,
                        setBehavior
                    )}
                </div>

                <div>
                    <h3>Overall Rating</h3>
                    {renderStars(
                        overall,
                        setOverall
                    )}
                </div>

                <button
                    onClick={submitRating}
                    className="bg-black text-white w-full py-3 rounded-lg"
                >
                    Submit Rating
                </button>
                

            </div>

        </div>
    );
};

export default RatingPage;