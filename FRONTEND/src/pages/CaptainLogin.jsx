import React, { useState } from 'react';
import { Link } from "react-router-dom";

const App = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData, setCaptainData] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();

        const data = {
            email,
            password
        };

        console.log(data);

        setCaptainData(data);

        setEmail('');
        setPassword('');
    };

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>

            <div>

                <form onSubmit={submitHandler}>

                    <img
                        className='w-16 mb-3'
                        src='https://freelogopng.com/images/all_img/1659761425uber-driver-logo-png.png'
                        alt='Uber Logo'
                    />

                    <h3 className='text-lg font-medium mb-2'>
                        What's your email
                    </h3>

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-[#eeeeee] rounded px-4 py-2 mb-5 border w-full text-lg placeholder:text-base'
                        required
                        type='email'
                        placeholder='email@example.com'
                    />

                    <h3 className='text-lg font-medium mb-2'>
                        Enter Password
                    </h3>

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-[#eeeeee] rounded px-4 py-2 mb-5 border w-full text-lg placeholder:text-base'
                        required
                        type='password'
                        placeholder='password'
                    />

                    <button
                        type='submit'
                        className='bg-[#111111] rounded mt-2 px-4 py-2 w-full text-lg text-white'
                    >
                        Login
                    </button>

                    <p className='text-center mt-2'>
                        Join a fleet?{" "}
                        <Link
                            to="/captain-signup"
                            className='text-blue-600'
                        >
                            Register as Captain
                        </Link>
                    </p>

                </form>

            </div>

            <div>

                <Link
                    to="/login"
                    className='bg-[#3db41cd0] flex items-center justify-center rounded mt-6 mb-5 px-4 py-2 w-full text-lg text-[#130000]'
                >
                    Sign in as User 👦🏻
                </Link>

            </div>

        </div>
    );
};

export default App;