import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopupPanel from '../components/ConfirmRidePopUpPanel';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useSocket } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import quickRideLogo from "../assets/QuickRide-logo-white.jpeg";


const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [rideRequest, setRideRequest] = useState(null);
  const [acceptedRide, setAcceptedRide] = useState(null);

  const ridePopupPanelRef = useRef(null);
  const ConfirmRidePopupPanelRef = useRef(null);
  const { socket } = useSocket(); 
  const { captain } = useContext(CaptainDataContext);

  console.log("CAPTAIN HOME DATA:", captain);

  useEffect(() => {
    if (!socket) return;

    const handleRideRequest = (data) => {
      setRideRequest(data);
      setRidePopupPanel(true);
      setConfirmRidePopupPanel(false);
    };

    socket.on('new-ride-request', handleRideRequest);

    return () => {
      socket.off('new-ride-request', handleRideRequest);
    };
  }, [socket]);

  useEffect(() => {
    if (!captain?._id || !socket) return;

    const joinSocket = () => {
      socket.emit('join', {
        userId: captain._id,
        userType: 'captain'
      });
    };

    if (socket.connected) {
      joinSocket();
    } else {
      socket.once('connect', joinSocket);
    }

    if (navigator.geolocation) {
      const sendLocation = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            socket.emit('update-location', {
              userId: captain._id,
              userType: 'captain',
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
            });
          },
          (error) => {
            console.error('Geolocation error:', error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 10000
          }
        );
      };

      sendLocation();

      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          socket.emit('update-location', {
            userId: captain._id,
            userType: 'captain',
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        },
        (error) => {
          console.error('Geolocation watch error:', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 5000
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
        socket.off('connect', joinSocket);
      };
    }

    return () => {
      socket.off('connect', joinSocket);
    };
  }, [captain, socket]);



   useGSAP(() => {

    if (ridePopupPanel) {

      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)'
      });

    } else {

      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      });

    }

  }, [ridePopupPanel]);


  useGSAP(() => {

    if (confirmRidePopupPanel) {

      gsap.to(ConfirmRidePopupPanelRef.current, {
        transform: 'translateY(0)'
      });

    } else {

      gsap.to(ConfirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)'
      });

    }

  }, [confirmRidePopupPanel]);



 return (
    <div className="relative h-screen max-w-md mx-auto overflow-hidden bg-slate-100">

        {/* MAP */}

        <div className="absolute inset-0">

            <img
                className="h-full w-full object-cover"
                src="https://i.sstatic.net/fKePl.gif"
                alt="map"
            />

            <div className="absolute inset-0 bg-black/10"></div>

        </div>

        {/* HEADER */}

        <div className="absolute top-0 left-0 right-0 z-10 mb-5 p-4">

            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-lg px-5 py-4 flex items-center justify-between mb-10">

                <div>

                   <img
                               className="h-6"
                             src={quickRideLogo}
                             alt="QuickRide"
                         />

                    <p className="text-xs text-slate-500 mt-1">
                        Captain Dashboard
                    </p>

                </div>

                <Link
                    to="/captain/logout"
                    className="h-12 w-12 rounded-2xl bg-red-50 flex items-center justify-center"
                >
                    <i className="ri-logout-box-r-line text-red-500 text-xl"></i>
                </Link>

            </div>

        </div>

        {/* STATUS CARD */}

        <div className="absolute top-28 left-4 right-4 z-20">

            <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>

                    <div>

                        <h3 className="font-semibold text-slate-800">
                            Online
                        </h3>

                        <p className="text-xs text-slate-500">
                            Ready for rides
                        </p>

                    </div>

                </div>

                <div className="text-right">

                    <p className="text-xs text-slate-500">
                        Rating
                    </p>

                    <h3 className="font-bold text-slate-800">
                        {captain?.averageRating?.toFixed(1) || "0.0"} ⭐
                    </h3>

                </div>

            </div>

        </div>

        {/* CAPTAIN DETAILS */}

        <div
            className={`absolute bottom-0 left-0 right-0 z-20 transition-all duration-300 ${
                ridePopupPanel || confirmRidePopupPanel
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
            }`}
        >
            <CaptainDetails />
        </div>

        {/* NEW RIDE POPUP */}

        <div
            ref={ridePopupPanelRef}
            className="fixed bottom-0 left-0 w-full z-40 translate-y-full bg-slate-50 rounded-t-[32px] px-4 py-5 max-h-[85vh] overflow-y-auto shadow-2xl"
        >

            <RidePopUp
                rideRequest={rideRequest}
                setRidePopupPanel={setRidePopupPanel}
                setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                setAcceptedRide={setAcceptedRide}
            />

        </div>

        {/* CONFIRM RIDE POPUP */}

        <div
            ref={ConfirmRidePopupPanelRef}
            className="fixed bottom-0 left-0 w-full z-50 translate-y-full bg-slate-50 rounded-t-[32px] px-4 py-5 max-h-[90vh] overflow-y-auto shadow-2xl"
        >

            <ConfirmRidePopupPanel
                rideRequest={acceptedRide || rideRequest}
                setConfirmRidePopupPanel={setConfirmRidePopupPanel}
            />

        </div>

    </div>
);
}

export default CaptainHome
