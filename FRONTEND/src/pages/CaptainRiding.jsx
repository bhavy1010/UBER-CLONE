import React, { useState , useRef } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import FinishRide from '../components/FinishRide';

const CaptainRiding = () => {

  const [finishRidePanel , setFinishRidePanel] = useState(false);
  const fineshRidePanelRef = useRef(null)

  useGSAP(() => {

    if (finishRidePanel) {

      gsap.to(fineshRidePanelRef.current, {
        transform: 'translateY(0)'
      });

    } else {

      gsap.to(fineshRidePanelRef.current, {
        transform: 'translateY(100%)'
      });

    }

  }, [finishRidePanel]);

  return (
    <div>
      
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
        <div 
             onClick={() =>{
              setFinishRidePanel(true)
            }}

            
            className='bg-[#d9d31a] w-screen h-1/5 p-3 bottom-0 absolute flex items-center justify-between mt-4'>
              <h5
        className=' text-center absolute top-0 w-[95%] cursor-pointer pb-5'
      >
        <i className="text-3xl font-bold  text-gray-800 ri-arrow-up-wide-line"></i>
      </h5>
            <h4 className='text-xl font-semibold ml-5'>4 KM away</h4>
            <button
           
            className='bg-green-600 flex items-center justify-center rounded-lg  px-10 p-3  text-lg text-black'>Complete Ride</button>
        </div>


        <div  ref={fineshRidePanelRef}
           className='fixed w-full z-30 bottom-0 translate-y-full h-screen bg-white px-3 py-10'>
          <FinishRide  setFinishRidePanel={setFinishRidePanel}/>
        </div>
    </div>
  )
}

export default CaptainRiding