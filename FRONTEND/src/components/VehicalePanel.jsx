import React from 'react'

const VehicalePanel = ({  setVehicalePanel, setConfirmRidePanel}) => {

  return (
    <div>

      <h5
        className='p-1 text-center absolute top-0 w-[95%] cursor-pointer'
        onClick={() => {
          setVehicalePanel(false)
        }}
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className='text-2xl font-semibold mb-3'>
        Choose your Ride
      </h3>

      <div onClick={() => {
        setConfirmRidePanel(true)
      }}
       className='flex w-full border-2 mb-2 active:border-black rounded-xl items-center justify-between p-2 h-20 cursor-pointer'>

        <img
          className='h-20'
          src='https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Black_v1.png'
          alt=''
        />

        <div className='w-1/2'>
          <h4 className='font-medium text-base'>
            UberGo <span><i className="ri-user-fill"></i> 4</span>
          </h4>

          <h5 className='font-medium text-sm'>
            2 mins away
          </h5>

          <p className='font-normal text-xs text-gray-600'>
            Affordable, compact rides
          </p>
        </div>

        <h2 className='text-lg font-semibold'>
          ₹263.68
        </h2>

      </div>

      <div onClick={() => {
        setConfirmRidePanel(true)
      }} className='flex w-full border-2 mb-2 active:border-black rounded-xl items-center justify-between p-2 h-20 cursor-pointer'>

        <img
          className='h-14 pl-3 mr-1'
          src='https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9lZjA5NThiZC1kNDMwLTQ1ZWYtYmU2Yi0zYmZiY2JmMDYyZjYucG5n'
          alt=''
        />

        <div className='w-1/2'>
          <h4 className='font-medium text-base'>
            Moto <span><i className="ri-user-fill"></i> 1</span>
          </h4>

          <h5 className='font-medium text-sm'>
            3 mins away
          </h5>

          <p className='font-normal text-xs text-gray-600'>
            Affordable Moto Ride
          </p>
        </div>

        <h2 className='text-lg font-semibold'>
          ₹68.23
        </h2>

      </div>

      <div onClick={() => {
        setConfirmRidePanel(true)
      }} className='flex w-full border-2 mb-2 active:border-black rounded-xl items-center justify-between p-2 h-20 cursor-pointer'>

        <img
          className='h-16 pl-2'
          src='https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mYzEwMWZmOC04MWExLTQ2YzMtOTk1YS02N2I0YmJkMmYyYmYuanBn'
          alt=''
        />

        <div className='w-1/2'>
          <h4 className='font-medium text-base'>
            UberAuto <span><i className="ri-user-fill"></i> 3</span>
          </h4>

          <h5 className='font-medium text-sm'>
            2 mins away
          </h5>

          <p className='font-normal text-xs text-gray-600'>
            Affordable Auto Ride
          </p>
        </div>

        <h2 className='text-lg font-semibold'>
          ₹135.07
        </h2>

      </div>

    </div>
  )
}

export default VehicalePanel