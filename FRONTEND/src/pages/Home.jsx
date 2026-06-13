import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehicalePanel from '../components/VehicalePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';


const Home = () => {

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehicalePanel, setVehicalePanel] = useState(false);
  const [confirmRidePanel , setConfirmRidePanel] =useState(false);
  const [vehicalefound , setVehicaleFound] = useState(false);
  const [waitingForDriver , setWaitingForDriver] = useState(false);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehicalePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicaleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);


  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {

    if (panelOpen) {

      gsap.to(panelRef.current, {
        height: '70%',
        padding: 20,
        opacity: 1
      });

      gsap.to(panelCloseRef.current, {
        opacity: 1
      });

    } else {

      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0,
        opacity: 0
      });

      gsap.to(panelCloseRef.current, {
        opacity: 0
      });

    }

  }, [panelOpen]);

  useGSAP(() => {

    if (vehicalePanel) {

      gsap.to(vehicalePanelRef.current, {
        transform: 'translateY(0)'
      });

    } else {

      gsap.to(vehicalePanelRef.current, {
        transform: 'translateY(100%)'
      });

    }

  }, [vehicalePanel]);


   useGSAP(() => {

    if (confirmRidePanel) {

      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      });

    } else {

      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      });

    }

  }, [confirmRidePanel]);

  useGSAP(() => {

    if (vehicalefound) {

      gsap.to(vehicaleFoundRef.current, {
        transform: 'translateY(0)'
      });

    } else {

      gsap.to(vehicaleFoundRef.current, {
        transform: 'translateY(100%)'
      });

    }

  }, [vehicalefound]);

  useGSAP(() => {

    if (waitingForDriver) {

      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      });

    } else {

      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      });

    }

  }, [waitingForDriver]);


  return (
    <div className='h-screen relative overflow-hidden'>

      <img
        className={`w-16 absolute left-5 top-5 z-20 transition-all duration-300 ${
          panelOpen ? 'opacity-0' : 'opacity-100'
        }`}
        src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
        alt='Uber Logo'
      />    

      <div className='h-screen w-screen'>
        <img
          className='h-full w-full object-cover'
          src='https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif'
          alt='map-demo'
        />
      </div>

      <div className='flex flex-col justify-end absolute top-0 h-screen w-full'>

        <div className='h-[30%] p-5 bg-white relative'>

          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className='absolute top-5 right-8 text-3xl opacity-0 cursor-pointer'
          >
            <i className="ri-arrow-down-wide-fill"></i>
          </h5>

          <h4 className='text-2xl font-semibold'>
            Find a trip
          </h4>

          <form onSubmit={submitHandler}>

            <div className="absolute h-14 w-1 rounded-full top-[45%] left-10 bg-gray-900"></div>
            <div className="absolute h-3 w-3 rounded-full top-[45%] left-9 bg-green-700"></div>
            <div className="absolute h-3 w-3 rounded-full top-[70%] left-9 bg-red-600"></div>

            <input
              value={pickup}
              onClick={() => setPanelOpen(true)}
              onChange={(e) => setPickup(e.target.value)}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5'
              type='text'
              placeholder='Add a pick-up location'
            />

            <input
              value={destination}
              onClick={() => setPanelOpen(true)}
              onChange={(e) => setDestination(e.target.value)}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3'
              type='text'
              placeholder='Enter your destination'
            />

          </form>

        </div>

        <div
          ref={panelRef}
          className='h-0 bg-white overflow-hidden'
        >
          <LocationSearchPanel
             vehicalePanel={vehicalePanel}
             setVehicalePanel={setVehicalePanel}
             setPanelOpen={setPanelOpen}
            />
        </div>

      </div>

      <div
        ref={vehicalePanelRef} className='fixed w-full z-30 bottom-0 translate-y-full bg-white px-3 py-10'>
        <VehicalePanel setVehicalePanel={setVehicalePanel} setConfirmRidePanel={setConfirmRidePanel} />
      </div>

      <div
        ref={confirmRidePanelRef} className='fixed w-full z-30 bottom-0 translate-y-full bg-white px-3 py-10'>
        < ConfirmRide confirmRidePanel={confirmRidePanel} setConfirmRidePanel={setConfirmRidePanel} 
                      setVehicaleFound={setVehicaleFound}/>
      </div>

      <div ref={vehicaleFoundRef}
         className='fixed w-full z-30 bottom-0 translate-y-full bg-white px-3 py-10'>
        < LookingForDriver />
      </div>

      <div ref={waitingForDriverRef}
         className='fixed w-full z-30 bottom-0 translate-y-full bg-white px-3 py-10'>
        < WaitingForDriver />
      </div>


    </div>
  );
};

export default Home;