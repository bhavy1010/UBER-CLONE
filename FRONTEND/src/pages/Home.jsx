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
            y: 0,
            duration: 0.35,
            ease: "power3.out"
        });

    } else {

        gsap.to(panelRef.current, {
            y: "100%",
            duration: 0.3,
            ease: "power3.in"
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
  <div className="relative h-screen overflow-hidden bg-slate-100">

    {/* MAP */}

    <div className="absolute inset-0">

      <img
        className="h-full w-full object-cover"
        src="https://i.sstatic.net/fKePl.gif"
        alt="map"
      />

      <div className="absolute inset-0 bg-black/10"></div>

    </div>

    {/* LOGO */}

    {!panelOpen && (

      <div className="absolute top-4 left-4 right-4 z-20">

        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-lg px-4 py-3">

          <img
            className="h-8"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber"
          />

          <p className="text-xs text-slate-500 mt-1">
            Find your next ride
          </p>

        </div>

      </div>

    )}

    {/* MAIN PANEL */}

    <div
      className={`absolute left-0 right-0 bottom-0 z-30 bg-white shadow-2xl transition-all duration-300 overflow-hidden ${
        panelOpen
          ? "top-0 rounded-none"
          : "rounded-t-[35px]"
      }`}
    >

      <div className="px-5 pt-6">

        {panelOpen && (

          <button
            onClick={() => setPanelOpen(false)}
            className="absolute top-5 right-5 h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center"
          >
            <i className="ri-close-line text-xl"></i>
          </button>

        )}

        <h2 className="text-3xl font-bold text-slate-800">
          Where to?
        </h2>

        <p className="text-sm text-slate-500 mb-5">
          Book a ride in seconds
        </p>

        <form onSubmit={submitHandler}>

          {/* PICKUP */}

          <div className="relative mb-3">

            <input
              value={pickup}
              onClick={() => {
                setActiveField("pickup");
                setPanelOpen(true);
              }}
              onChange={(e) => {
                setPickup(e.target.value);
                setActiveField("pickup");
                setPanelOpen(true);
              }}
              className="w-full h-14 pl-14 pr-4 rounded-2xl bg-slate-100 border border-slate-200"
              placeholder="Enter pickup location"
            />

            <div className="absolute left-4 top-1/2 -translate-y-1/2">

              <i className="ri-map-pin-user-fill text-green-600 text-lg"></i>

            </div>

          </div>

          {/* DESTINATION */}

          <div className="relative">

            <input
              value={destination}
              onClick={() => {
                setActiveField("destination");
                setPanelOpen(true);
              }}
              onChange={(e) => {
                setDestination(e.target.value);
                setActiveField("destination");
                setPanelOpen(true);
              }}
              className="w-full h-14 pl-14 pr-4 rounded-2xl bg-slate-100 border border-slate-200"
              placeholder="Where are you going?"
            />

            <div className="absolute left-4 top-1/2 -translate-y-1/2">

              <i className="ri-map-2-fill text-red-500 text-lg"></i>

            </div>

          </div>

        </form>

        {panelOpen && (

          <button
            onClick={findTrip}
            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 rounded-2xl shadow-lg"
          >
            Find Ride
          </button>

        )}

      </div>

      {/* LOCATION SUGGESTIONS */}

      {panelOpen && (

        <div className="h-[calc(100vh-220px)] overflow-y-auto mt-5">

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

      )}

    </div>

    {/* VEHICLE PANEL */}

    <div
      ref={vehicalePanelRef}
      className="fixed bottom-0 left-0 right-0 z-50 bg-slate-50 px-4 py-6 rounded-t-[35px] translate-y-full"
    >

      <VehicalePanel
        setVehicalePanel={setVehicalePanel}
        setConfirmRidePanel={setConfirmRidePanel}
        fare={fare}
        setVehicleType={setVehicleType}
        setSelectedFare={setSelectedFare}
      />

    </div>

    {/* CONFIRM RIDE */}

    <div
      ref={confirmRidePanelRef}
      className="fixed bottom-0 left-0 right-0 z-50 bg-slate-50 px-4 py-6 rounded-t-[35px] translate-y-full"
    >

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

    {/* LOOKING FOR DRIVER */}

    <div
      ref={vehicaleFoundRef}
      className="fixed bottom-0 left-0 right-0 z-50 bg-slate-50 px-4 py-6 rounded-t-[35px] translate-y-full"
    >

      <LookingForDriver
        pickup={pickup}
        destination={destination}
        fare={fare}
        vehicleType={vehicleType}
      />

    </div>

    {/* WAITING FOR DRIVER */}

    <div
      ref={waitingForDriverRef}
      className="fixed bottom-0 left-0 right-0 z-50 bg-slate-50 px-4 py-6 rounded-t-[35px] translate-y-full"
    >

      <WaitingForDriver
        ride={currentRide}
        otp={rideOtp}
      />

    </div>

  </div>
);
};

export default Home;