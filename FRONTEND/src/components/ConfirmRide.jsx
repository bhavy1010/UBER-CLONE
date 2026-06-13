import React from 'react'

const ConfirmRide = ({setConfirmRidePanel , setVehicaleFound}) => {
  return (
    <div>


      <h5
        className='p-1 text-center absolute top-0 w-[95%] cursor-pointer'
        onClick={() => {
          setConfirmRidePanel(false)
        }}>
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>

        <h3 className='text-2xl font-semibold mb-3'>
          Confirm your Ride
        </h3>

        <div className='flex gap-3 justify-between items-center flex-col'>
          <img className='h-20' src='https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85MDM0YzIwMC1jZTI5LTQ5ZjEtYmYzNS1lOWQyNTBlODIxN2EucG5n'></img>
          
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

          <button 
          onClick={() =>{
            setVehicaleFound(true);
            setConfirmRidePanel(false)
          }}
          className='bg-[#d4cd00d0] flex items-center justify-center rounded-lg mt-6 px-4 py-2 w-full text-lg text-[#130000]'>Cornfirm</button>

        </div>


    </div>
  )
}

export default ConfirmRide