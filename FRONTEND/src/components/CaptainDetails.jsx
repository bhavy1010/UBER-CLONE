import React, { useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainDetails = () => {

    const { captain } = useContext(CaptainDataContext);

    return (
    <div className="w-full">

        <div className="bg-white rounded-t-[30px] shadow-2xl px-4 pt-4 pb-5">

            {/* Profile */}

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <img
                        className="h-12 w-12 rounded-full object-cover border-2 border-blue-100"
                        src="https://img.buzzfeed.com/buzzfeed-static/static/2016-04/25/10/enhanced/webdr06/original-30465-1461593533-10.jpg?fill=625:625"
                        alt="captain"
                    />

                    <div>

                        <h2 className="font-bold text-slate-800 text-lg capitalize">
                            {
                                captain?.fullname
                                    ? `${captain.fullname.firstname} ${captain.fullname.lastname || ''}`
                                    : "Captain"
                            }
                        </h2>

                        <p className="text-xs text-slate-500">
                            Driver Partner
                        </p>

                    </div>

                </div>

                <div className="bg-green-100 px-3 py-1 rounded-full">

                    <span className="text-green-700 text-xs font-semibold">
                        Active
                    </span>

                </div>

            </div>

            {/* Earnings */}

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-4 mt-4 text-white">

                <p className="text-blue-100 text-xs">
                    Total Earnings
                </p>

                <h2 className="text-3xl font-bold mt-1">
                    ₹{captain?.totalEarnings || 0}
                </h2>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-4 gap-2 mt-4">

                <div className="bg-slate-50 rounded-xl p-2 text-center">

                    <i className="ri-time-line text-blue-600 text-lg"></i>

                    <h3 className="font-bold text-sm mt-1">
                        {captain?.hoursOnline || 0}
                    </h3>

                    <p className="text-[10px] text-slate-500">
                        Hours
                    </p>

                </div>

                <div className="bg-slate-50 rounded-xl p-2 text-center">

                    <i className="ri-road-map-line text-green-600 text-lg"></i>

                    <h3 className="font-bold text-sm mt-1">
                        {captain?.totalTrips || 0}
                    </h3>

                    <p className="text-[10px] text-slate-500">
                        Trips
                    </p>

                </div>

                <div className="bg-slate-50 rounded-xl p-2 text-center">

                    <i className="ri-star-fill text-yellow-500 text-lg"></i>

                    <h3 className="font-bold text-sm mt-1">
                        {captain?.averageRating?.toFixed(1) || "0.0"}
                    </h3>

                    <p className="text-[10px] text-slate-500">
                        Rating
                    </p>

                </div>

                <div className="bg-slate-50 rounded-xl p-2 text-center">

                    <i className="ri-chat-smile-3-line text-purple-600 text-lg"></i>

                    <h3 className="font-bold text-sm mt-1">
                        {captain?.ratingCount || 0}
                    </h3>

                    <p className="text-[10px] text-slate-500">
                        Reviews
                    </p>

                </div>

            </div>

        </div>

    </div>
);
};

export default CaptainDetails;