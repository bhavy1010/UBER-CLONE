import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from '../context/CaptainContext';


const FinishRide = ({ ride, setFinishRidePanel }) => {

    const navigate = useNavigate();

    const { captain, setCaptain } = useContext(CaptainDataContext);

    const passengerName =
        ride?.user?.fullname
            ? `${ride.user.fullname.firstname} ${ride.user.fullname.lastname}`
            : "Passenger";

    const pickup = ride?.pickup || "Pickup Location";

    const destination =
        ride?.destination || "Destination";

    const fare = ride?.fare || 0;

    const completeRide = () => {

    const updatedCaptain = {
        ...captain,
        totalEarnings:
            (captain?.totalEarnings || 0) + fare,
        totalTrips:
            (captain?.totalTrips || 0) + 1
    };

    setCaptain(updatedCaptain);

    localStorage.setItem(
        "captain",
        JSON.stringify(updatedCaptain)
    );

    localStorage.removeItem("currentRide");

    navigate("/captain-home");
};

    return (
        <div>

            <h5
                className='p-1 text-center absolute top-0 w-[95%] cursor-pointer'
                onClick={() => {
                    setFinishRidePanel(false);
                }}
            >
                <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className='text-2xl font-semibold mb-7'>
                Arrived at Destination
            </h3>

            <div className='flex justify-between items-center p-3 mb-6 bg-[#dbe341] rounded-lg'>

                <div className='flex justify-between items-center gap-2'>

                    <img
                        className='h-12 w-12 object-cover rounded-full'
                        src='https://beam-images.warnermediacdn.com/2025-07/daenarys-1920.jpg?host=wbd-dotcom-drupal-prd-us-east-1.s3.amazonaws.com&w=320'
                        alt='user-image'
                    />

                    <h2 className='text-lg'>
                        {passengerName}
                    </h2>

                </div>

                <h5 className='font-semibold text-xl'>
                    ₹{fare}
                </h5>

            </div>

            <div className='flex gap-3 justify-between items-center flex-col'>

                <div className='w-full mt-3'>

                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-user-fill"></i>

                        <div>
                            <h3 className='text-lg font-medium'>
                                Pickup
                            </h3>

                            <p className='text-sm -mt-1 text-gray-600'>
                                {pickup}
                            </p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-2-line"></i>

                        <div>
                            <h3 className='text-lg font-medium'>
                                Destination
                            </h3>

                            <p className='text-sm -mt-1 text-gray-600'>
                                {destination}
                            </p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3'>
                        <i className="text-lg ri-currency-line"></i>

                        <div>
                            <h3 className='text-lg font-medium'>
                                ₹{fare}
                            </h3>
                        </div>
                    </div>

                </div>

                <div className='items-center justify-between w-full gap-5 mt-7'>

                    <button
                        onClick={completeRide}
                        className='bg-[#2cb61fd0] flex items-center justify-center rounded-lg mb-6 px-4 py-2 w-full text-lg text-[#ffffff]'
                    >
                        End this Ride
                    </button>

                    <p className='text-red-500 text-xs mt-40 items-center'>
                        Click on End this Ride after collecting payment
                    </p>

                </div>

            </div>

        </div>
    );
};

export default FinishRide;