import React, { useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainDetails = () => {

    const { captain } = useContext(CaptainDataContext);

    return (
        <div>
            <div className='absolute bg-white bottom-2 w-full p-3 rounded-t-lg'>

                <div className='flex items-center justify-between'>

                    <div className='flex items-center justify-start gap-4'>

                        <img
                            className='h-14 w-14 rounded-full object-cover'
                            src='https://img.buzzfeed.com/buzzfeed-static/static/2016-04/25/10/enhanced/webdr06/original-30465-1461593533-10.jpg?fill=625:625'
                            alt='captain'
                        />

                        <h4 className='capitalize text-lg font-semibold text-gray-800'>
                            {captain?.fullname?.firstname + " " + captain?.fullname?.lastname || "Captain"}
                        </h4>

                    </div>

                    <div>
                        <h4 className='font-semibold text-xl'>₹295.5</h4>
                        <p>Earned</p>
                    </div>

                </div>

                <div className='flex p-5 mt-5 mb-3 bg-[#3fdc6c] rounded-lg justify-center gap-5'>

                    <div className='text-center'>
                        <i className="text-2xl font-thin ri-time-line"></i>
                        <h5 className='text-lg font-medium'>10.3</h5>
                        <p className='text-sm text-gray-800'>Hours Online</p>
                    </div>

                    <div className='text-center'>
                        <i className="text-2xl font-thin ri-speed-up-line"></i>
                        <h5 className='text-lg font-medium'>10.3</h5>
                        <p className='text-sm text-gray-800'>Total Trips</p>
                    </div>

                    <div className='text-center'>
                        <i className="text-2xl font-thin ri-booklet-line"></i>
                        <h5 className='text-lg font-medium'>10.3</h5>
                        <p className='text-sm text-gray-800'>Ratings</p>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default CaptainDetails;