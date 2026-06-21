import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';

const RidePopUp = ({
    rideRequest,
    setConfirmRidePopupPanel
}) => {

    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { socket } = useSocket();
    const { captain } = useContext(CaptainDataContext);

    const user = rideRequest?.ride?.user;
    const pickup = rideRequest?.ride?.pickup;
    const destination = rideRequest?.ride?.destination;
    const fare = rideRequest?.ride?.fare;

    const distanceKm =
        rideRequest?.ride?.distance
            ? (rideRequest.ride.distance / 1000).toFixed(1)
            : '0';

    const userName = user?.fullname
        ? `${user.fullname.firstname || ''} ${user.fullname.lastname || ''}`.trim()
        : 'Passenger';

    const submitHandler = (e) => {

        e.preventDefault();

        if (otp.trim() !== String(rideRequest?.ride?.otp || "")) {
            setError("Invalid OTP");
            return;
        }

        setError("");

        socket.emit("ride-started", {
            rideId: rideRequest?.ride?._id
        });

        setConfirmRidePopupPanel(false);

        navigate("/captain-Riding", {
            state: {
                ride: rideRequest?.ride
            }
        });
    };

    return (
    <div className='h-full overflow-y-auto pb-4'>

        {/* Header */}

        <div className='flex items-center justify-between mb-4'>

            <div>

                <h2 className='text-xl font-bold text-slate-800'>
                    Start Ride
                </h2>

                <p className='text-xs text-slate-500'>
                    Verify OTP to begin trip
                </p>

            </div>

            <div className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold'>
                {distanceKm} KM
            </div>

        </div>

        {/* Passenger */}

        <div className='bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-3 text-white shadow-lg mb-3'>

            <div className='flex items-center justify-between'>

                <div className='flex items-center gap-3'>

                    <div className='h-11 w-11 rounded-full bg-white/20 flex items-center justify-center'>
                        <i className="ri-user-3-fill text-lg"></i>
                    </div>

                    <div>

                        <p className='text-blue-100 text-xs'>
                            Passenger
                        </p>

                        <h3 className='font-semibold'>
                            {userName}
                        </h3>

                    </div>

                </div>

                <div className='text-right'>

                    <h3 className='text-lg font-bold'>
                        {distanceKm}
                    </h3>

                    <p className='text-blue-100 text-xs'>
                        KM
                    </p>

                </div>

            </div>

        </div>

        {/* Pickup */}

        <div className='bg-white border border-slate-200 rounded-2xl p-3 shadow-sm mb-3'>

            <div className='flex gap-3'>

                <div className='h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0'>
                    <i className="ri-map-pin-user-fill text-green-600"></i>
                </div>

                <div>

                    <p className='text-xs uppercase text-slate-400 font-semibold'>
                        Pickup
                    </p>

                    <h3 className='text-sm font-medium text-slate-800 mt-1'>
                        {pickup}
                    </h3>

                </div>

            </div>

        </div>

        {/* Destination */}

        <div className='bg-white border border-slate-200 rounded-2xl p-3 shadow-sm mb-3'>

            <div className='flex gap-3'>

                <div className='h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0'>
                    <i className="ri-map-2-line text-red-500"></i>
                </div>

                <div>

                    <p className='text-xs uppercase text-slate-400 font-semibold'>
                        Destination
                    </p>

                    <h3 className='text-sm font-medium text-slate-800 mt-1'>
                        {destination}
                    </h3>

                </div>

            </div>

        </div>

        {/* Fare */}

        <div className='bg-blue-600 rounded-2xl p-4 text-white shadow-lg mb-3'>

            <div className='flex items-center justify-between'>

                <div>

                    <p className='text-blue-100 text-xs'>
                        Ride Fare
                    </p>

                    <h2 className='text-2xl font-bold mt-1'>
                        ₹{fare || 0}
                    </h2>

                </div>

                <div className='h-11 w-11 rounded-full bg-white/20 flex items-center justify-center'>
                    <i className="ri-wallet-3-line"></i>
                </div>

            </div>

        </div>

        {/* OTP Notice */}

        <div className='bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-3'>

            <p className='text-xs text-yellow-800'>
                Ask passenger for OTP before starting ride.
            </p>

        </div>

        {/* OTP */}

        <form onSubmit={submitHandler}>

            <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                type='text'
                maxLength='6'
                placeholder='OTP'
                className='w-full h-14 text-center text-2xl font-bold tracking-[6px] border-2 border-blue-200 rounded-2xl bg-blue-50 outline-none focus:ring-4 focus:ring-blue-200 mb-3'
            />

            {error && (

                <div className='bg-red-50 border border-red-200 rounded-xl p-2 mb-3'>

                    <p className='text-red-600 text-xs text-center'>
                        {error}
                    </p>

                </div>

            )}

            <button
                type='submit'
                className='w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 rounded-2xl shadow-lg mb-2'
            >
                Start Ride
            </button>

            <button
                type='button'
                onClick={() => {
                    setConfirmRidePopupPanel(false);
                }}
                className='w-full bg-slate-200 text-slate-700 font-semibold py-3 rounded-2xl'
            >
                Cancel
            </button>

        </form>

    </div>
);
};

export default RidePopUp;