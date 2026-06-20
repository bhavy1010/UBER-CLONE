import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import FinishRide from '../components/FinishRide';
import LiveMap from '../components/LiveMap';

const CaptainRiding = () => {

  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const [ride, setRide] = useState(null);

  const finishRidePanelRef = useRef(null);

  const location = useLocation();

  useEffect(() => {

    if (location.state?.ride) {

      setRide(location.state.ride);

      localStorage.setItem(
        "currentRide",
        JSON.stringify(location.state.ride)
      );

    } else {

      const currentRide = JSON.parse(
        localStorage.getItem("currentRide")
      );

      if (currentRide) {
        setRide(currentRide);
      }

    }

  }, [location]);

  useGSAP(() => {

    if (finishRidePanel) {

      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)'
      });

    } else {

      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)'
      });

    }

  }, [finishRidePanel]);

  return (
    <div>

      <div className="absolute inset-0 z-0">
        {ride && (
          <LiveMap
            pickup={[
                ride?.pickupCoordinates?.lat,
                ride?.pickupCoordinates?.lng
            ]}
            destination={[
                ride?.destinationCoordinates?.lat,
                ride?.destinationCoordinates?.lng
              ]}
          />
         )}
      </div>

      <div className='absolute top-1 w-full flex items-center justify-between rounded-xl p-5 pl-14'>

        <img
          className='h-7 left-10'
          src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
          alt='uber'
        />

        <Link to='/captain-home'>
          <i className="text-black font-black text-3xl ri-logout-box-line"></i>
        </Link>

      </div>

      <div
        onClick={() => setFinishRidePanel(true)}
        className='bg-[#d9d31a] w-screen p-5 bottom-0 absolute'
      >

        <h5 className='text-center'>
          <i className="text-3xl font-bold text-gray-800 ri-arrow-up-wide-line"></i>
        </h5>

        <div className='flex justify-between items-center'>

          <div>

            <h3 className='text-xl font-bold'>
              {ride?.user?.fullname?.firstname || "Passenger"}
            </h3>

            <p className='text-sm text-gray-700'>
              {ride?.pickup || "Pickup"}
            </p>

            <p className='text-sm text-gray-700'>
              {ride?.destination || "Destination"}
            </p>

            <p className='font-semibold mt-2'>
              ₹{ride?.fare || 0}
            </p>

          </div>

          <button
            className='bg-green-600 rounded-lg px-10 py-3 text-lg text-white'
          >
            Complete Ride
          </button>

        </div>

      </div>

      <div
        ref={finishRidePanelRef}
        className='fixed w-full z-30 bottom-0 translate-y-full h-screen bg-white px-3 py-10'
      >
        <FinishRide
          ride={ride}
          setFinishRidePanel={setFinishRidePanel}
        />
      </div>

    </div>
  );
};

export default CaptainRiding;