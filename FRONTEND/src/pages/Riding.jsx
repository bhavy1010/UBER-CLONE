import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Riding = () => {

    const navigate = useNavigate();


  return (
    <div>
        
        {/* <div className='h-screen w-screen'> */}
        <img
          className=' -mt-9 h-full w-full object-cover'
          src='https://i.sstatic.net/fKePl.gif'
          alt='map-demo'
        />
        <div className='absolute top-3 right-3 '>
          <img src=''></img>
            <Link
            to='/home' className='right-3'
            ><i className=" text-black font-black text-3xl ri-home-4-line"></i></Link>
        </div>
      {/* </div> */}

    <div className='absolute bg-white bottom-2  w-full p-3'>

      

      <div className='flex items-center justify-between '>

        <img
          className='h-20'
          src='https://static.vecteezy.com/system/resources/thumbnails/025/309/938/small/white-suv-on-transparent-background-3d-rendering-illustration-free-png.png'
          alt='car-png'
        />

        <div className='text-right'>
          <h2 className='text-sm font-medium'>
            SANTH
          </h2>

          <h4 className='text-lg font-semibold -mt-1'>
            KA15AK00-0
          </h4>

          <p className='text-sm text-gray-600'>
            White LandRover Defender
          </p>

          <div className='flex justify-end items-center gap-1 mt-1'>
            <i className="ri-star-fill text-yellow-400"></i>
            <span className='font-medium'>4.9</span>
          </div>
        </div>

      </div>


       <div className='w-full mt-3'>
            
            <div className='flex items-center gap-5 p-1 border-b-2'>
              <i className="text-lg  ri-map-2-line"></i>
              <div>
                <h3 className='text-lg font-medium'>Metro Station 12/B</h3>
                <p className=' text-sm -mt-1 text-gray-600'>Sector-1,Gandhinagar</p>
              </div>
            </div>

            
            <div className='flex items-center gap-5 p-1'>
              <i className="text-lg  ri-currency-line"></i>
              <div>
                <h3 className='text-lg font-medium'>₹236.78</h3>
                {/* <p className=' text-sm -mt-1 text-gray-600'>sector-25 ,Gandhinagar</p> */}
              </div>

            </div>
            <div className='bg-[#d4cd00d0] flex items-center justify-center rounded mt-6 px-4 py-2 w-full text-lg text-[#130000]'>
        <button>Make a Payment</button>
      </div>
      </div>

    </div>

      

    </div>
  )
}

export default Riding