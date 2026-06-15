import React from 'react'

const RidePopUp = ({setRidePopupPanel , setConfirmRidePopupPanel}) => {
  return (
    <div>
        {/* <h5
        className='p-1 text-center absolute top-0 w-[95%] cursor-pointer'
        onClick={() => {
          setConfirmRidePanel(false)
        }}>
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5> */}

        <h3 className='text-2xl font-semibold mb-3'>
          New Ride Available!
        </h3>

        <div className='flex justify-between items-center p-3 bg-[#dbe341] rounded-lg'>
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

         <div className='flex items-center justify-between w-full gap-5'>
             <button 
          onClick={() =>{
            setConfirmRidePopupPanel(true);
            setRidePopupPanel(false);
          }}
          className='bg-[#2cb61fd0] flex items-center justify-center rounded-lg  px-4 py-2 w-full text-lg text-[#ffffff]'>Accept</button>


           <button 
          onClick={() =>{
            setRidePopupPanel(false);
          }}
          className='bg-[#9f9f9f] flex items-center justify-center rounded-lg px-4 py-2 w-full text-lg text-[#130000]'>Ignore</button>
         </div>
        </div>


    </div>
  )
}

export default RidePopUp