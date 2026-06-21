import React from 'react';

const WaitingForDriver = ({ ride, otp }) => {

    const pickup = ride?.pickup || "Pickup";
    const destination = ride?.destination || "Destination";
    const fare = ride?.fare || 0;

    return (
        <div className='pb-5'>

            <div className='flex items-center justify-between mb-5'>

                <div>

                    <h2 className='text-2xl font-bold text-slate-800'>
                        Driver Assigned
                    </h2>

                    <p className='text-sm text-slate-500'>
                        Share OTP with your driver to start the ride
                    </p>

                </div>

                <div className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold'>
                    Live
                </div>

            </div>

            {/* OTP Card */}

            <div className='bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-3xl p-6 shadow-lg mb-5'>

                <p className='text-blue-100 text-sm'>
                    Ride OTP
                </p>

                <h2 className='text-5xl font-bold tracking-[10px] mt-2 text-center'>
                    {otp || "----"}
                </h2>

            </div>

            {/* Ride Details */}

            <div className='space-y-4'>

                <div className='bg-white border border-slate-200 rounded-3xl p-4 shadow-sm'>

                    <div className='flex gap-4'>

                        <div className='h-12 w-12 rounded-full bg-green-100 flex items-center justify-center'>
                            <i className="ri-map-pin-user-fill text-green-600 text-xl"></i>
                        </div>

                        <div>

                            <p className='text-xs uppercase text-slate-400 font-semibold'>
                                Pickup
                            </p>

                            <h3 className='font-semibold text-slate-800 mt-1'>
                                {pickup}
                            </h3>

                        </div>

                    </div>

                </div>

                <div className='bg-white border border-slate-200 rounded-3xl p-4 shadow-sm'>

                    <div className='flex gap-4'>

                        <div className='h-12 w-12 rounded-full bg-red-100 flex items-center justify-center'>
                            <i className="ri-map-2-line text-red-500 text-xl"></i>
                        </div>

                        <div>

                            <p className='text-xs uppercase text-slate-400 font-semibold'>
                                Destination
                            </p>

                            <h3 className='font-semibold text-slate-800 mt-1'>
                                {destination}
                            </h3>

                        </div>

                    </div>

                </div>

                <div className='bg-blue-600 rounded-3xl p-5 text-white shadow-lg'>

                    <div className='flex items-center justify-between'>

                        <div>

                            <p className='text-blue-100 text-sm'>
                                Total Fare
                            </p>

                            <h2 className='text-3xl font-bold mt-1'>
                                ₹{fare}
                            </h2>

                        </div>

                        <div className='h-14 w-14 rounded-full bg-white/20 flex items-center justify-center'>
                            <i className="ri-wallet-3-line text-2xl"></i>
                        </div>

                    </div>

                </div>

            </div>

            <div className='mt-5 bg-yellow-50 border border-yellow-200 rounded-2xl p-4'>

                <div className='flex gap-3 items-start'>

                    <i className="ri-information-line text-yellow-600 text-xl"></i>

                    <p className='text-sm text-yellow-800'>
                        Tell the OTP to your driver only after they arrive at your pickup location.
                    </p>

                </div>

            </div>

        </div>
    );
};

export default WaitingForDriver;