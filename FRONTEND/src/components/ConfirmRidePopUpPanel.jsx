import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const RidePopUp = ({ rideRequest, setConfirmRidePopupPanel }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { socket } = useSocket();
  const { captain } = useContext(CaptainDataContext);

  const user = rideRequest?.ride?.user;
  const pickup = rideRequest?.ride?.pickup;
  const destination = rideRequest?.ride?.destination;
  const fare = rideRequest?.ride?.fare;
  const distanceKm = rideRequest?.ride?.distance
    ? (rideRequest.ride.distance / 1000).toFixed(1)
    : '0';

  const userName = user?.fullname
    ? `${user.fullname.firstname || ''} ${user.fullname.lastname || ''}`.trim()
    : 'Passenger';

  const submitHandler = (e) => {
    e.preventDefault();

    console.log("Entered OTP:", otp);
    console.log("rideRequest:", rideRequest);

console.log("OTP 1:", rideRequest?.otp);

console.log("OTP 2:", rideRequest?.ride?.otp);

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
    <div>
      <h3 className='text-2xl font-semibold mb-7'>
        Confirm Your Ride
      </h3>

      <div className='flex justify-between items-center p-3 mb-6 bg-[#dbe341] rounded-lg'>
        <div className='flex justify-between items-center gap-2'>
          <img
            className='h-12 w-12 object-cover rounded-full'
            src='https://beam-images.warnermediacdn.com/2025-07/daenarys-1920.jpg?host=wbd-dotcom-drupal-prd-us-east-1.s3.amazonaws.com&w=320'
            alt='user-image'
          />
          <h2 className='text-lg'>{userName}</h2>
        </div>
        <h5 className='font-semibold text-xl'>{distanceKm} KM</h5>
      </div>

      <div className='flex gap-3 justify-between items-center flex-col'>
        <div className='w-full mt-3'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className='text-lg ri-map-pin-user-fill'></i>
            <div>
              <h3 className='text-lg font-medium'>Pickup</h3>
              <p className='text-sm -mt-1 text-gray-600'>{pickup}</p>
            </div>
          </div>

          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className='text-lg ri-map-2-line'></i>
            <div>
              <h3 className='text-lg font-medium'>Destination</h3>
              <p className='text-sm -mt-1 text-gray-600'>{destination}</p>
            </div>
          </div>

          <div className='flex items-center gap-5 p-3'>
            <i className='text-lg ri-currency-line'></i>
            <div>
              <h3 className='text-lg font-medium'>₹{fare || 0}</h3>
            </div>
          </div>
        </div>

        <div className='items-center justify-between w-full gap-5 mt-7'>
          <form onSubmit={submitHandler}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type='text'
              maxLength='6'
              placeholder='Enter your OTP'
              className='w-full mb-5 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl bg-white shadow-md outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 hover:border-blue-400'
            />

            <button
              type='submit'
              className='bg-[#2cb61fd0] flex items-center justify-center rounded-lg mb-3 px-4 py-2 w-full text-lg text-[#ffffff]'
            >
              Start a Ride
            </button>

            {error && (
              <p className='text-red-500 text-sm mb-3'>{error}</p>
            )}

            <button
              type="button"
              onClick={() => {
                  setConfirmRidePopupPanel(false);
              }}
              className='bg-[#ad1700d0] flex items-center justify-center rounded-lg px-4 py-2 w-full text-lg text-[#ffffff]'
            >
              Cancel Ride
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;