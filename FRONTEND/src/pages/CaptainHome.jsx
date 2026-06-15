import React, { useState , useRef } from 'react'
import { Link, useNavigate } from "react-router-dom";
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopupPanel from "../components/ConfirmRidePopUpPanel"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const CaptainHome = () => {

  const [ridePopupPanel , setRidePopupPanel] = useState(true);
  const [confirmRidePopupPanel , setConfirmRidePopupPanel] = useState(false);

  const ridePopupPanelRef = useRef(null)
  const ConfirmRidePopupPanelRef = useRef(null)



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
          <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel}/>
        </div>

        <div  ref={ConfirmRidePopupPanelRef}
           className='fixed w-full z-30 bottom-0 translate-y-full h-screen bg-white px-3 py-10'>
          <ConfirmRidePopupPanel  setConfirmRidePopupPanel={setConfirmRidePopupPanel}/>
        </div>

      

    </div>
  )
}

export default CaptainHome
