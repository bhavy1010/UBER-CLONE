import React from 'react';

const WaitingForDriver = ({ ride, otp }) => {
  const pickup = ride?.pickup || 'Pickup';
  const destination = ride?.destination || 'Destination';
  const fare = ride?.fare || 0;

  return (
    <div>
      <h3 className='text-2xl font-semibold mb-5'>
        Waiting for Driver
      </h3>

      <div className='rounded-xl bg-[#f5f3b5] p-4 mb-4'>
        <p className='text-sm text-gray-600'>Ride OTP</p>
        <h2 className='text-3xl font-bold tracking-widest'>{otp || '----'}</h2>
      </div>

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
            <h3 className='text-lg font-medium'>₹{fare}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;