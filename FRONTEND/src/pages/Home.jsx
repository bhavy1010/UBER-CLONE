import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehicalePanel from '../components/VehicalePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { useSocket } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';

const Home = () => {

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehicalePanel, setVehicalePanel] = useState(false);
  const [confirmRidePanel , setConfirmRidePanel] =useState(false);
  const [vehicalefound , setVehicaleFound] = useState(false);
  const [waitingForDriver , setWaitingForDriver] = useState(false);
  const [activeField, setActiveField] = useState('pickup');
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [suggestionsError, setSuggestionsError] = useState('');
  const [fare , setFare] = useState({});
  const [vehicleType, setVehicleType] = useState("");
  const [selectedFare, setSelectedFare] = useState(0);
  const [currentRide, setCurrentRide] = useState(null);
  const [rideOtp, setRideOtp] = useState('');

  const navigate = useNavigate();
  const { socket, sendMessage, receiveMessage } = useSocket();
  const [user, setUser] = useContext(UserDataContext);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehicalePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicaleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);


  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    console.log('User data in Home component:', user);

    const token = localStorage.getItem('token');

    if (!token || (user && user._id)) return;

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.data?.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, [user, setUser]);

  useEffect(() => {
    if (!user?._id || !socket) return;

    const joinSocket = () => {
      socket.emit('join', {
        userId: user._id,
        userType: 'user'
      });

      sendMessage('userOnline', {
        userId: user._id,
        userType: 'user'
      });
    };

    if (socket.connected) {
      joinSocket();
    } else {
      socket.once('connect', joinSocket);
    }

    const handleRideAccepted = (data) => {
      const acceptedRide = data?.ride || data;
      const acceptedOtp = data?.otp || acceptedRide?.otp || '';

      setCurrentRide(acceptedRide);
      setRideOtp(acceptedOtp);
      setWaitingForDriver(true);
      setVehicaleFound(false);
      setConfirmRidePanel(false);
      setVehicalePanel(false);
      setPanelOpen(false);
    };

    const handleRideStarted = (data) => {

  console.log("RIDE STARTED RECEIVED");
  console.log(data);

  if (data?.ride) {
    setCurrentRide(data.ride);

    localStorage.setItem(
      "currentRide",
      JSON.stringify(data.ride)
    );
  }

  navigate('/Riding');
};

    socket.on('ride-accepted', handleRideAccepted);
socket.on('ride-started', handleRideStarted);

return () => {
  socket.off('connect', joinSocket);
  socket.off('ride-accepted', handleRideAccepted);
  socket.off('ride-started', handleRideStarted);
};
  }, [user, socket, sendMessage, navigate]);

  useEffect(() => {
    if (!panelOpen) {
      setSuggestions([]);
      setSuggestionsError('');
      return;
    }

    const query = activeField === 'pickup' ? pickup : destination;

    if (query.trim().length < 2) {
      setSuggestions([]);
      setSuggestionsError('Type at least 2 characters to search');
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      setLoadingSuggestions(true);
      setSuggestionsError('');

      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: query },
            headers: token
              ? { Authorization: `Bearer ${token}` }
              : undefined,
            signal: controller.signal,
          }
        );

        setSuggestions(response.data || []);
      } catch (error) {
        if (axios.isCancel(error) || error?.code === 'ERR_CANCELED') {
          return;
        }

        setSuggestions([]);
        setSuggestionsError('Unable to load suggestions');
      } finally {
        setLoadingSuggestions(false);
      }
    }, 250);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [activeField, pickup, destination, panelOpen]);

  const handleSelectSuggestion = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion);
    } else {
      setDestination(suggestion);
    }

    setPanelOpen(false);
    setVehicalePanel(true);
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


  async function findTrip() {
  try {

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: {
          pickup,
          destination
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    setFare(response.data.fare);

    setVehicalePanel(true);
    setPanelOpen(false);

  } catch (error) {
    console.log(error.response?.data);
  }
}


  async function createRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        { pickup, destination, vehicleType },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      const rideData = response.data?.ride || response.data;
      const otp = response.data?.otp || '';

      setCurrentRide(rideData);
      setRideOtp(otp);

      if (rideData) {
        const emitRideRequest = () => {
          socket.emit('ride-request', {
            ride: rideData,
            otp
          });
        };

        if (socket?.connected) {
          emitRideRequest();
        } else {
          socket?.once('connect', emitRideRequest);
        }
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }
  


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
          className=' -mt-9 h-full w-full object-cover'
          src='https://i.sstatic.net/fKePl.gif'
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
              onClick={() => {
                setActiveField('pickup');
                setPanelOpen(true);
              }}
              onChange={(e) => {
                setActiveField('pickup');
                setPickup(e.target.value);
              }}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5'
              type='text'
              placeholder='Add a pick-up location'
            />

            <input
              value={destination}
              onClick={() => {
                setActiveField('destination');
                setPanelOpen(true);
              }}
              onChange={(e) => {
                setActiveField('destination');
                setDestination(e.target.value);
              }}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3'
              type='text'
              placeholder='Enter your destination'
            />

          </form>

              <button 
              onClick={()=>{
               findTrip();
              }}
              className=' mt-9  bg-[#2cb61fd0] flex items-center justify-center rounded-lg mb-6 px-4 py-2 w-full text-lg text-[#ffffff]'>
                Find Trip
              </button>

        </div>

        <div
          ref={panelRef}
          className='h-0 bg-white overflow-hidden'
        >
          <LocationSearchPanel
            suggestions={suggestions}
            loading={loadingSuggestions}
            error={suggestionsError}
            onSelectSuggestion={handleSelectSuggestion}
            activeField={activeField}
            setVehicalePanel={setVehicalePanel}
            setPanelOpen={setPanelOpen}
          />
        </div>

      </div>

      <div
        ref={vehicalePanelRef} className='fixed w-full z-30 bottom-0 translate-y-full bg-white px-3 py-10'>
        <VehicalePanel
          
          setVehicalePanel={setVehicalePanel}
          setConfirmRidePanel={setConfirmRidePanel}
          fare={fare}
          setVehicleType={setVehicleType}
          setSelectedFare={setSelectedFare}
        />
      </div>

      <div
        ref={confirmRidePanelRef} className='fixed w-full z-30 bottom-0 translate-y-full bg-white px-3 py-10'>
        <ConfirmRide
        createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicaleFound={setVehicaleFound}
          setWaitingForDriver={setWaitingForDriver}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
      />
      </div>

      <div ref={vehicaleFoundRef}
         className='fixed w-full z-30 bottom-0 translate-y-full bg-white px-3 py-10'>
        < LookingForDriver  
            setWaitingForDriver={setWaitingForDriver}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}/>
      </div>

      <div ref={waitingForDriverRef}
         className='fixed w-full z-30 bottom-0 translate-y-full bg-white px-3 py-10'>
        <WaitingForDriver ride={currentRide} otp={rideOtp} />
      </div>


    </div>
  );
};

export default Home;