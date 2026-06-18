import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopupPanel from '../components/ConfirmRidePopUpPanel';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useSocket } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [rideRequest, setRideRequest] = useState(null);
  const [acceptedRide, setAcceptedRide] = useState(null);

  const ridePopupPanelRef = useRef(null);
  const ConfirmRidePopupPanelRef = useRef(null);

  const { socket, sendMessage } = useSocket();
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
    <div>
        
        {/* <div className='h-screen w-screen'> */}
        <img
          className=' -mt-9 h-full w-full object-cover'
          src='https://i.sstatic.net/fKePl.gif'
          alt='map-demo'
        />
        <div className='absolute top-1  w-full flex items-center justify-between rounded-xl p-5'>
          <img className='h-7 ' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'></img>
            <Link
            to='/home'
            ><i className=" text-black font-black text-3xl ri-logout-box-line"></i></Link>
        </div>
      {/* </div> */}

        <div>
          <CaptainDetails/>
        </div>
        <div  ref={ridePopupPanelRef}
           className='fixed w-full z-30 bottom-0 translate-y-full bg-white px-3 py-10'>
          <RidePopUp
              rideRequest={rideRequest}
              setRidePopupPanel={setRidePopupPanel}
              setConfirmRidePopupPanel={setConfirmRidePopupPanel}
              setAcceptedRide={setAcceptedRide}
          />
        </div>

        <div  ref={ConfirmRidePopupPanelRef}
           className='fixed w-full z-30 bottom-0 translate-y-full h-screen bg-white px-3 py-10'>
          <ConfirmRidePopupPanel
              rideRequest={acceptedRide || rideRequest}
              setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          />
        </div>

      

    </div>
  )
}

export default CaptainHome
