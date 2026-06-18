import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Riding = () => {

    const [ride, setRide] = useState(null);

    useEffect(() => {

        const storedRide =
            localStorage.getItem("currentRide");

        if (storedRide) {
            setRide(JSON.parse(storedRide));
        }

    }, []);

    return (
        <div>

            <img
                className='-mt-9 h-full w-full object-cover'
                src='https://i.sstatic.net/fKePl.gif'
                alt='map-demo'
            />

            <div className='absolute top-3 right-3'>
                <Link to='/home'>
                    <i className="text-black font-black text-3xl ri-home-4-line"></i>
                </Link>
            </div>

            <div className='absolute bg-white bottom-2 w-full p-3 rounded-t-xl'>

                <div className='flex items-center justify-between'>

                    <img
                        className='h-20'
                        src='https://static.vecteezy.com/system/resources/thumbnails/025/309/938/small/white-suv-on-transparent-background-3d-rendering-illustration-free-png.png'
                        alt='car'
                    />

                    <div className='text-right'>

                        <h2 className='text-sm font-medium'>
                            {ride?.captain?.fullname?.firstname || "Captain"}
                        </h2>

                        <h4 className='text-lg font-semibold -mt-1'>
                            {ride?.captain?.vehicle?.plate || "Vehicle"}
                        </h4>

                        <p className='text-sm text-gray-600'>
                            {ride?.captain?.vehicle?.color}{" "}
                            {ride?.captain?.vehicle?.vehicleType}
                        </p>

                    </div>

                </div>

                <div className='w-full mt-3'>

                    <div className='flex items-center gap-5 p-2 border-b-2'>
                        <i className="text-lg ri-map-pin-user-fill"></i>

                        <div>
                            <h3 className='text-lg font-medium'>
                                Pickup
                            </h3>

                            <p className='text-sm text-gray-600'>
                                {ride?.pickup}
                            </p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-2 border-b-2'>
                        <i className="text-lg ri-map-2-line"></i>

                        <div>
                            <h3 className='text-lg font-medium'>
                                Destination
                            </h3>

                            <p className='text-sm text-gray-600'>
                                {ride?.destination}
                            </p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-2'>
                        <i className="text-lg ri-currency-line"></i>

                        <div>
                            <h3 className='text-lg font-medium'>
                                ₹{ride?.fare || 0}
                            </h3>
                        </div>
                    </div>

                    <button
                        className='bg-[#d4cd00d0] flex items-center justify-center rounded mt-6 px-4 py-2 w-full text-lg text-[#130000]'
                    >
                        Make Payment
                    </button>

                </div>

            </div>

        </div>
    );
};

export default Riding;