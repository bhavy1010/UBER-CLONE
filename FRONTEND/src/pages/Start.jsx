import React from 'react'
import {Route , Routes} from "react-router-dom";
import {Link} from "react-router-dom";

const Start = () => {
  return (
    <div>
        <div className='bg-center bg-cover bg-[url(https://plus.unsplash.com/premium_vector-1726299021262-e339aebb9dcd?q=80&w=718&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] pt-8 h-screen w-full  flex justify-between flex-col bg-cover '>
            <img className='w-16 ml-8 opacity-0' src='https://freelogopng.com/images/all_img/1659768779uber-logo-white.png'/>
            <div className='bg-white py-4 px-4 pb-7'>
                <h2 className='text-2xl font-bold'>Get Started with QuickRide</h2>
                <Link to='/login' className='justify-center flex item-center w-full bg-black text-white py-3 rounded mt-4'>Contine</Link>
            </div>
        </div>
    </div>
  )
}

export default Start
