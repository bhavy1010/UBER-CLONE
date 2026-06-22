import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import FinishRide from '../components/FinishRide';
import LiveMap from '../components/LiveMap';
import quickRideLogo from "../assets/QuickRide-logo-white.jpeg";


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
  <div className="relative h-screen overflow-hidden bg-slate-100">

    {/* MAP */}

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

    {/* HEADER */}

    <div className="absolute top-4 left-4 right-4 z-20">

      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-lg px-4 py-3 flex items-center justify-between">

        <div>

          <img
                      className="h-6"
                    src={quickRideLogo}
                    alt="QuickRide"
                />

          <p className="text-xs text-slate-500 mt-1">
            Ride In Progress
          </p>

        </div>

        <Link
          to="/captain-home"
          className="h-10 w-10 rounded-2xl bg-slate-100 flex items-center justify-center"
        >
          <i className="ri-arrow-left-line text-lg text-slate-700"></i>
        </Link>

      </div>

    </div>

    {/* BOTTOM SHEET */}

    <div
      onClick={() => setFinishRidePanel(true)}
      className="absolute bottom-0 left-0 right-0 z-20 max-h-[42vh]"
    >

      <div className="bg-white rounded-t-[30px] shadow-2xl px-4 pt-3 pb-4 overflow-y-auto max-h-[42vh]">

        <div className="flex justify-center mb-2">

          <div className="w-14 h-1.5 bg-slate-300 rounded-full"></div>

        </div>

        {/* PASSENGER */}

        <div className="flex items-center justify-between mb-3">

          <div>

            <p className="text-[10px] uppercase text-slate-400 font-semibold">
              Passenger
            </p>

            <h2 className="text-base font-bold text-slate-800">
              {ride?.user?.fullname?.firstname || "Passenger"}
            </h2>

          </div>

          <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
            On Trip
          </div>

        </div>

        {/* PICKUP */}

        <div className="bg-slate-50 rounded-2xl p-2.5 mb-2">

          <p className="text-[10px] uppercase text-slate-400 font-semibold">
            Pickup
          </p>

          <p className="text-sm text-slate-700 mt-1">
            {ride?.pickup || "Pickup"}
          </p>

        </div>

        {/* DESTINATION */}

        <div className="bg-slate-50 rounded-2xl p-2.5 mb-2">

          <p className="text-[10px] uppercase text-slate-400 font-semibold">
            Destination
          </p>

          <p className="text-sm text-slate-700 mt-1">
            {ride?.destination || "Destination"}
          </p>

        </div>

        {/* FARE */}

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-3 text-white mb-3">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-blue-100 text-[11px]">
                Trip Fare
              </p>

              <h2 className="text-xl font-bold mt-1">
                ₹{ride?.fare || 0}
              </h2>

            </div>

            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">

              <i className="ri-wallet-3-line"></i>

            </div>

          </div>

        </div>

        {/* COMPLETE BUTTON */}

        <button
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-2.5 rounded-2xl shadow-lg"
        >
          Complete Ride
        </button>

      </div>

    </div>

    {/* FINISH RIDE PANEL */}

    <div
      ref={finishRidePanelRef}
      className="fixed bottom-0 left-0 right-0 z-40 h-screen translate-y-full bg-slate-50 px-4 py-6 rounded-t-[35px]"
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