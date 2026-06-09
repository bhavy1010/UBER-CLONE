import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const UserSignup = () => {

    const navigate = useNavigate();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        const newUser = {
            fullname: {
                firstname,
                lastname
            },
            email,
            password
        };

        console.log(newUser);

        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');

        navigate('/login');
    };

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>

            <div>

                <form onSubmit={submitHandler}>

                    <img
                        className='w-16 mb-10'
                        src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
                        alt='Uber Logo'
                    />

                    <h3 className='text-lg font-medium mb-2'>
                        What's your name
                    </h3>

                    <div className='flex gap-4 mb-5'>
                        <input
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg'
                            required
                            type='text'
                            placeholder='First Name'
                        />

                        <input
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg'
                            type='text'
                            placeholder='Last Name'
                        />
                    </div>

                    <h3 className='text-lg font-medium mb-2'>
                        What's your email
                    </h3>

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-[#eeeeee] rounded px-4 py-2 mb-5 border w-full text-lg'
                        required
                        type='email'
                        placeholder='email@example.com'
                    />

                    <h3 className='text-lg font-medium mb-2'>
                        Create Password
                    </h3>

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-[#eeeeee] rounded px-4 py-2 mb-5 border w-full text-lg'
                        required
                        type='password'
                        placeholder='password'
                    />

                    <button
                        type='submit'
                        className='bg-[#111111] rounded mt-2 px-4 py-2 w-full text-lg text-white'
                    >
                        Create Account
                    </button>

                    <p className='text-center mt-2'>
                        Already have an account?{' '}
                        <Link to="/login" className='text-blue-600'>
                            Login here
                        </Link>
                    </p>

                </form>

            </div>

            <p className='text-[11px] text-gray-600 mt-8 mb-4 leading-4'>
    By proceeding, you consent to receive calls, WhatsApp messages, or SMS,
    including automated messages, from Uber and its affiliates at the number
    provided.
</p>

        </div>
    );
};

export default UserSignup;