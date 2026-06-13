import React from 'react'

const WaitingForDriver = () => {
  return (
    <div>

      <h3 className='text-2xl font-semibold mb-5'>
        Waiting for Driver
      </h3>

      <div className='flex items-center justify-between'>

        <img
          className='h-20'
          src='https://static.vecteezy.com/system/resources/thumbnails/025/309/938/small/white-suv-on-transparent-background-3d-rendering-illustration-free-png.png'
          alt=''
        />

        <div className='text-right'>
          <h2 className='text-lg font-medium'>
            SANTH
          </h2>

          <h4 className='text-2xl font-semibold -mt-1'>
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

    </div>
  )
}

export default WaitingForDriver