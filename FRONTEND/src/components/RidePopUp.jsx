import React, { useContext } from 'react';
import { useSocket } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';

const RidePopUp = ({
  rideRequest,
  setRidePopupPanel,
  setConfirmRidePopupPanel
}) => {

  const { socket } = useSocket();
  const { captain } = useContext(CaptainDataContext);

  const user = rideRequest?.ride?.user;
  const pickup = rideRequest?.ride?.pickup;
  const destination = rideRequest?.ride?.destination;
  const fare = rideRequest?.ride?.fare;

  const distanceKm = rideRequest?.ride?.distance
    ? (rideRequest.ride.distance / 1000).toFixed(1)
    : '0';

  const userId =
    user?._id ||
    rideRequest?.ride?.userId ||
    rideRequest?.ride?.user;

  const userName = user?.fullname
    ? `${user.fullname.firstname || ''} ${user.fullname.lastname || ''}`.trim()
    : 'Passenger';

  const handleAcceptRide = () => {

    console.log("========== ACCEPT CLICKED ==========");
    console.log("Captain:", captain);
    console.log("Ride Request:", rideRequest);

    const emitAcceptRide = () => {

      socket.emit('ride-accepted', {
        rideId: rideRequest?.ride?._id,
        userId,
        captainId: captain?._id
      });

      console.log("ride-accepted event emitted");
    };

    if (
      socket &&
      rideRequest?.ride?._id &&
      captain?._id
    ) {

      if (socket.connected) {
        emitAcceptRide();
      } else {
        socket.once('connect', emitAcceptRide);
      }

      localStorage.setItem(
  "currentRide",
  JSON.stringify(rideRequest?.ride)
);

      setConfirmRidePopupPanel(true);
      setRidePopupPanel(false);

    } else {

      console.log("Missing data");
      console.log({
        socketConnected: socket?.connected,
        rideId: rideRequest?.ride?._id,
        userId,
        captainId: captain?._id
      });

    }
  };

  return (
    <div>

      <h3 className='text-2xl font-semibold mb-3'>
        New Ride Available!
      </h3>

      <div className='flex justify-between items-center p-3 bg-[#dbe341] rounded-lg'>

        <div className='flex justify-between items-center gap-2'>
          <img
            className='h-12 w-12 object-cover rounded-full'
            src='https://beam-images.warnermediacdn.com/2025-07/daenarys-1920.jpg?host=wbd-dotcom-drupal-prd-us-east-1.s3.amazonaws.com&w=320'
            alt='user'
          />

          <h2 className='text-lg'>
            {userName}
          </h2>
        </div>

        <h5 className='font-semibold text-xl'>
          {distanceKm} KM
        </h5>

      </div>

      <div className='flex gap-3 justify-between items-center flex-col'>

        <div className='w-full mt-3'>

          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className='text-lg ri-map-pin-user-fill'></i>

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
            <i className='text-lg ri-map-2-line'></i>

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
            <i className='text-lg ri-currency-line'></i>

            <div>
              <h3 className='text-lg font-medium'>
                ₹{fare || 0}
              </h3>
            </div>
          </div>

        </div>

        <div className='flex items-center justify-between w-full gap-5'>

          <button
            onClick={handleAcceptRide}
            className='bg-[#2cb61fd0] flex items-center justify-center rounded-lg px-4 py-2 w-full text-lg text-white'
          >
            Accept
          </button>

          <button
            onClick={() => {
              setRidePopupPanel(false);
            }}
            className='bg-[#9f9f9f] flex items-center justify-center rounded-lg px-4 py-2 w-full text-lg text-[#130000]'
          >
            Ignore
          </button>

        </div>

      </div>

    </div>
  );
};

export default RidePopUp;