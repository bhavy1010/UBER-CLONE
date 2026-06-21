import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from '../context/CaptainContext';

const FinishRide = ({
    ride,
    setFinishRidePanel
}) => {

    const navigate = useNavigate();

    const { captain, setCaptain } =
        useContext(CaptainDataContext);

    const passengerName =
        ride?.user?.fullname
            ? `${ride.user.fullname.firstname} ${ride.user.fullname.lastname}`
            : "Passenger";

    const pickup =
        ride?.pickup || "Pickup Location";

    const destination =
        ride?.destination || "Destination";

    const fare =
        ride?.fare || 0;

    const completeRide = async () => {

        try {

            await axios.post(
                `${import.meta.env.VITE_BASE_URL}/captains/update-stats`,
                {
                    fare: ride?.fare || 0
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

            navigate("/captain-home");

        } catch (error) {

            console.log(error);

        }

    };

    return (
    <div className='h-full overflow-y-auto pb-5'>

        <h5
            className='sticky top-0 text-center py-1 bg-slate-50 z-10 cursor-pointer'
            onClick={() => {
                setFinishRidePanel(false);
            }}
        >
            <i className="text-3xl text-slate-400 ri-arrow-down-wide-line"></i>
        </h5>

        {/* Header */}

        <div className='mb-4'>

            <div className='flex items-center justify-between'>

                <div>

                    <h2 className='text-xl font-bold text-slate-800'>
                        Ride Completed
                    </h2>

                    <p className='text-xs text-slate-500'>
                        Ready to finish trip
                    </p>

                </div>

                <div className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold'>
                    Completed
                </div>

            </div>

        </div>

        {/* Passenger */}

        <div className='bg-white rounded-2xl border border-slate-200 p-3 shadow-sm mb-3'>

            <div className='flex items-center justify-between'>

                <div className='flex items-center gap-3'>

                    <img
                        className='h-12 w-12 rounded-full object-cover'
                        src='https://beam-images.warnermediacdn.com/2025-07/daenarys-1920.jpg?host=wbd-dotcom-drupal-prd-us-east-1.s3.amazonaws.com&w=320'
                        alt='passenger'
                    />

                    <div>

                        <p className='text-xs text-slate-500'>
                            Passenger
                        </p>

                        <h3 className='font-semibold text-slate-800'>
                            {passengerName}
                        </h3>

                    </div>

                </div>

                <div className='text-right'>

                    <p className='text-xs text-slate-500'>
                        Fare
                    </p>

                    <h3 className='text-xl font-bold text-green-600'>
                        ₹{fare}
                    </h3>

                </div>

            </div>

        </div>

        {/* Pickup */}

        <div className='bg-white rounded-2xl border border-slate-200 p-3 shadow-sm mb-3'>

            <div className='flex gap-3'>

                <div className='h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0'>
                    <i className="ri-map-pin-user-fill text-green-600"></i>
                </div>

                <div>

                    <p className='text-xs text-slate-400 uppercase font-semibold'>
                        Pickup
                    </p>

                    <h3 className='text-sm font-medium text-slate-800 mt-1'>
                        {pickup}
                    </h3>

                </div>

            </div>

        </div>

        {/* Destination */}

        <div className='bg-white rounded-2xl border border-slate-200 p-3 shadow-sm mb-3'>

            <div className='flex gap-3'>

                <div className='h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0'>
                    <i className="ri-map-2-line text-red-500"></i>
                </div>

                <div>

                    <p className='text-xs text-slate-400 uppercase font-semibold'>
                        Destination
                    </p>

                    <h3 className='text-sm font-medium text-slate-800 mt-1'>
                        {destination}
                    </h3>

                </div>

            </div>

        </div>

        {/* Earnings */}

        <div className='bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-4 text-white shadow-lg mb-3'>

            <div className='flex items-center justify-between'>

                <div>

                    <p className='text-blue-100 text-xs'>
                        Ride Earnings
                    </p>

                    <h2 className='text-2xl font-bold mt-1'>
                        ₹{fare}
                    </h2>

                </div>

                <div className='h-12 w-12 rounded-full bg-white/20 flex items-center justify-center'>
                    <i className="ri-wallet-3-line text-xl"></i>
                </div>

            </div>

        </div>

        {/* Warning */}

        <div className='bg-yellow-50 border border-yellow-200 rounded-2xl p-3 mb-4'>

            <div className='flex gap-2 items-start'>

                <i className="ri-information-line text-yellow-600 text-lg"></i>

                <p className='text-xs text-yellow-800 leading-5'>
                    Confirm payment has been collected before ending the ride.
                </p>

            </div>

        </div>

        {/* Button */}

        <button
            onClick={completeRide}
            className='w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 rounded-2xl shadow-lg'
        >
            End Ride
        </button>

    </div>
);
};

export default FinishRide;