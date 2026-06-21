import React from 'react';

const ConfirmRide = ({
    createRide,
    setConfirmRidePanel,
    setVehicaleFound,
    setWaitingForDriver,
    pickup,
    destination,
    fare,
    vehicleType
}) => {

    const getVehicleImage = () => {

        if (vehicleType === "car") {
            return "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85MDM0YzIwMC1jZTI5LTQ5ZjEtYmYzNS1lOWQyNTBlODIxN2EucG5n";
        }

        if (vehicleType === "moto") {
            return "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9lZjA5NThiZC1kNDMwLTQ1ZWYtYmU2Yi0zYmZiY2JmMDYyZjYucG5n";
        }

        return "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mYzEwMWZmOC04MWExLTQ2YzMtOTk1YS02N2I0YmJkMmYyYmYuanBn";
    };

    return (
        <div className='pb-5'>

            <h5
                className='absolute top-3 left-0 right-0 text-center cursor-pointer'
                onClick={() => {
                    setConfirmRidePanel(false);
                }}
            >
                <i className="text-3xl text-slate-400 ri-arrow-down-wide-line"></i>
            </h5>

            <div className='mt-6'>

                <h2 className='text-2xl font-bold text-slate-800'>
                    Confirm Ride
                </h2>

                <p className='text-sm text-slate-500 mt-1'>
                    Review your trip details before booking
                </p>

            </div>

            <div className='flex flex-col items-center mt-5'>

                <div className='bg-blue-50 rounded-3xl p-4 w-full flex justify-center'>

                    <img
                        className='h-24 object-contain'
                        src={getVehicleImage()}
                        alt='vehicle'
                    />

                </div>

            </div>

            <div className='mt-5 space-y-4'>

                <div className='bg-white border border-slate-200 rounded-3xl p-4 shadow-sm'>

                    <div className='flex gap-4 items-start'>

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

                    <div className='flex gap-4 items-start'>

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
                                Estimated Fare
                            </p>

                            <h2 className='text-3xl font-bold mt-1'>
                                ₹{fare?.fare?.[vehicleType] || 0}
                            </h2>

                        </div>

                        <div className='h-14 w-14 rounded-full bg-white/20 flex items-center justify-center'>

                            <i className="ri-wallet-3-line text-2xl"></i>

                        </div>

                    </div>

                </div>

            </div>

            <button
                onClick={() => {

                    setVehicaleFound(true);
                    setConfirmRidePanel(false);
                    setWaitingForDriver(false);

                    createRide();

                }}
                className='w-full mt-6 bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white font-semibold py-4 rounded-2xl shadow-lg'
            >
                Confirm Ride
            </button>

        </div>
    );
};

export default ConfirmRide;