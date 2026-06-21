import React from 'react';

const VehicalePanel = ({
    setVehicalePanel,
    setConfirmRidePanel,
    fare,
    setVehicleType,
    setSelectedFare
}) => {

    return (
        <div className='pb-5'>

            <h5
                className='absolute top-3 left-0 right-0 text-center cursor-pointer'
                onClick={() => setVehicalePanel(false)}
            >
                <i className="text-3xl text-slate-400 ri-arrow-down-wide-line"></i>
            </h5>

            <div className='mt-6 mb-5'>

                <h2 className='text-2xl font-bold text-slate-800'>
                    Choose a Ride
                </h2>

                <p className='text-slate-500 text-sm mt-1'>
                    Select the vehicle that suits your trip
                </p>

            </div>

            {/* CAR */}

            <div
                onClick={() => {
                    setVehicleType("car");
                    setSelectedFare(fare?.fare?.car);
                    setConfirmRidePanel(true);
                }}
                className='bg-white border border-slate-200 rounded-3xl p-4 mb-4 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-[0.98]'
            >

                <div className='flex items-center justify-between'>

                    <div className='flex items-center gap-4'>

                        <div className='bg-blue-50 rounded-2xl p-2'>

                            <img
                                className='h-16'
                                src='https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Black_v1.png'
                                alt='car'
                            />

                        </div>

                        <div>

                            <div className='flex items-center gap-2'>

                                <h3 className='font-bold text-slate-800'>
                                    UberGo
                                </h3>

                                <span className='text-sm text-slate-500'>
                                    <i className="ri-user-fill"></i> 4
                                </span>

                            </div>

                            <p className='text-sm text-slate-500'>
                                2 min away
                            </p>

                            <p className='text-xs text-slate-400'>
                                Affordable everyday rides
                            </p>

                        </div>

                    </div>

                    <div className='text-right'>

                        <h3 className='text-xl font-bold text-slate-800'>
                            ₹{fare?.fare?.car}
                        </h3>

                    </div>

                </div>

            </div>

            {/* BIKE */}

            <div
                onClick={() => {
                    setVehicleType("moto");
                    setSelectedFare(fare?.fare?.moto);
                    setConfirmRidePanel(true);
                }}
                className='bg-white border border-slate-200 rounded-3xl p-4 mb-4 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-[0.98]'
            >

                <div className='flex items-center justify-between'>

                    <div className='flex items-center gap-4'>

                        <div className='bg-green-50 rounded-2xl p-2'>

                            <img
                                className='h-14'
                                src='https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9lZjA5NThiZC1kNDMwLTQ1ZWYtYmU2Yi0zYmZiY2JmMDYyZjYucG5n'
                                alt='bike'
                            />

                        </div>

                        <div>

                            <div className='flex items-center gap-2'>

                                <h3 className='font-bold text-slate-800'>
                                    Moto
                                </h3>

                                <span className='text-sm text-slate-500'>
                                    <i className="ri-user-fill"></i> 1
                                </span>

                            </div>

                            <p className='text-sm text-slate-500'>
                                3 min away
                            </p>

                            <p className='text-xs text-slate-400'>
                                Fast and affordable bike rides
                            </p>

                        </div>

                    </div>

                    <div className='text-right'>

                        <h3 className='text-xl font-bold text-slate-800'>
                            ₹{fare?.fare?.moto}
                        </h3>

                    </div>

                </div>

            </div>

            {/* AUTO */}

            <div
                onClick={() => {
                    setVehicleType("auto");
                    setSelectedFare(fare?.fare?.auto);
                    setConfirmRidePanel(true);
                }}
                className='bg-white border border-slate-200 rounded-3xl p-4 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-[0.98]'
            >

                <div className='flex items-center justify-between'>

                    <div className='flex items-center gap-4'>

                        <div className='bg-yellow-50 rounded-2xl p-2'>

                            <img
                                className='h-14'
                                src='https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mYzEwMWZmOC04MWExLTQ2YzMtOTk1YS02N2I0YmJkMmYyYmYuanBn'
                                alt='auto'
                            />

                        </div>

                        <div>

                            <div className='flex items-center gap-2'>

                                <h3 className='font-bold text-slate-800'>
                                    Uber Auto
                                </h3>

                                <span className='text-sm text-slate-500'>
                                    <i className="ri-user-fill"></i> 3
                                </span>

                            </div>

                            <p className='text-sm text-slate-500'>
                                2 min away
                            </p>

                            <p className='text-xs text-slate-400'>
                                Budget-friendly auto rides
                            </p>

                        </div>

                    </div>

                    <div className='text-right'>

                        <h3 className='text-xl font-bold text-slate-800'>
                            ₹{fare?.fare?.auto}
                        </h3>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default VehicalePanel;