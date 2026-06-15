import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const RidePopUp = ({setFinishRidePanel}) => {

    const navigate = useNavigate();

  return (
    <div>
        <h5
        className='p-1 text-center absolute top-0 w-[95%] cursor-pointer'
        onClick={() => {
          setFinishRidePanel(false)
        }}>
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>

        <h3 className='text-2xl font-semibold mb-7'>
          Arrived at Destination
        </h3>

        <div className='flex justify-between items-center p-3 mb-6 bg-[#dbe341] rounded-lg'>
            <div className='flex justify-between items-center gap-2' >
                <img className='h-12 w-12 object-cover rounded-full' src='https://beam-images.warnermediacdn.com/2025-07/daenarys-1920.jpg?host=wbd-dotcom-drupal-prd-us-east-1.s3.amazonaws.com&w=320' alt='user-image'></img>
                <h2 className='text-lg'>Mother Of Dragon</h2>
            </div>
            <h5 className='font-semibold text-xl'>16.9 KM</h5>
        </div>


        <div className='flex gap-3 justify-between items-center flex-col'>
          
          <div className='w-full mt-3'>
            <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="text-lg  ri-map-pin-user-fill"></i>
              <div>
                <h3 className='text-lg font-medium'>562/11C</h3>
                <p className=' text-sm -mt-1 text-gray-600'>Sector-25 ,Gandhinagar</p>
              </div>
            </div>
            
            <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="text-lg  ri-map-2-line"></i>
              <div>
                <h3 className='text-lg font-medium'>Metro Station 12/B</h3>
                <p className=' text-sm -mt-1 text-gray-600'>Sector-1,Gandhinagar</p>
              </div>
            </div>

            
            <div className='flex items-center gap-5 p-3'>
              <i className="text-lg  ri-currency-line"></i>
              <div>
                <h3 className='text-lg font-medium'>₹236.78</h3>
                {/* <p className=' text-sm -mt-1 text-gray-600'>sector-25 ,Gandhinagar</p> */}
              </div>

            </div>
          </div>

          

            <div className=' items-center justify-between w-full gap-5 mt-7'>
                
                    {/* <input
                        type="text"
                        maxLength="4"
                        placeholder='Enter your OTP'
                        className="w-full mb-5 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl bg-white shadow-md outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 hover:border-blue-400"
                    /> */}

                        <Link to="/captain-Riding"
                        className='bg-[#2cb61fd0] flex items-center justify-center rounded-lg mb-6 px-4 py-2 w-full text-lg text-[#ffffff]'>End this Ride</Link>

                        <p className='text-red-500 text-xs mt-40 items-center'>click on End this Ride , if you have completed the payment</p>
           
            </div>
        </div>


    </div>
  )
}

export default RidePopUp