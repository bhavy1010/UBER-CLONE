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
    <div className="pb-4">

        <div className="flex items-center justify-between mb-5">

            <div>

                <h2 className="text-2xl font-bold text-slate-800">
                    New Ride Request
                </h2>

                <p className="text-sm text-slate-500">
                    A passenger nearby needs a ride
                </p>

            </div>

            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                Live
            </div>

        </div>

        {/* Passenger Card */}

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-5 text-white shadow-lg">

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                    <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center">

                        <i className="ri-user-3-fill text-2xl"></i>

                    </div>

                    <div>

                        <h3 className="text-lg font-semibold">
                            {userName}
                        </h3>

                        <p className="text-blue-100 text-sm">
                            Passenger
                        </p>

                    </div>

                </div>

                <div className="text-right">

                    <h3 className="text-2xl font-bold">
                        {distanceKm}
                    </h3>

                    <p className="text-blue-100 text-sm">
                        KM Away
                    </p>

                </div>

            </div>

        </div>

        {/* Trip Details */}

        <div className="space-y-4 mt-5">

            <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm">

                <div className="flex gap-4">

                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">

                        <i className="ri-map-pin-user-fill text-green-600 text-xl"></i>

                    </div>

                    <div>

                        <p className="text-xs uppercase text-slate-400 font-semibold">
                            Pickup Location
                        </p>

                        <h3 className="font-semibold text-slate-800 mt-1">
                            {pickup}
                        </h3>

                    </div>

                </div>

            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm">

                <div className="flex gap-4">

                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">

                        <i className="ri-map-2-line text-red-500 text-xl"></i>

                    </div>

                    <div>

                        <p className="text-xs uppercase text-slate-400 font-semibold">
                            Destination
                        </p>

                        <h3 className="font-semibold text-slate-800 mt-1">
                            {destination}
                        </h3>

                    </div>

                </div>

            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">

                        <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">

                            <i className="ri-money-rupee-circle-fill text-yellow-600 text-xl"></i>

                        </div>

                        <div>

                            <p className="text-xs uppercase text-slate-400 font-semibold">
                                Trip Fare
                            </p>

                            <h3 className="font-semibold text-slate-800 mt-1">
                                Ride Earnings
                            </h3>

                        </div>

                    </div>

                    <h2 className="text-3xl font-bold text-blue-600">
                        ₹{fare || 0}
                    </h2>

                </div>

            </div>

        </div>

        {/* Action Buttons */}

        <div className="flex gap-3 mt-6">

            <button
                onClick={handleAcceptRide}
                className="flex-1 bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white font-semibold py-4 rounded-2xl shadow-lg"
            >
                Accept Ride
            </button>

            <button
                onClick={() => {
                    setRidePopupPanel(false);
                }}
                className="flex-1 bg-slate-200 hover:bg-slate-300 transition-all duration-200 text-slate-700 font-semibold py-4 rounded-2xl"
            >
                Ignore
            </button>

        </div>

    </div>
);
};

export default RidePopUp;