import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const App = () => {


const navigate = useNavigate();

const [user, setUser] = useContext(UserDataContext);

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [userData, setUserData] = useState({});

const submitHandler = async (e) => {

    e.preventDefault();

    const data = {
        email,
        password
    };

    try {

        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/users/login`,
            data
        );

        if (response.status === 200) {

            const responseData = response.data;

            localStorage.setItem('token', responseData.token);

            setUser(responseData.user);

            navigate('/home');
        }

    } catch (error) {

        console.log(error);

    }

    setUserData(data);

    setEmail('');
    setPassword('');
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
                    New here?{" "}
                    <Link
                        to="/signup"
                        className='text-blue-600'
                    >
                        Create new Account
                    </Link>
                </p>

            </form>

        </div>

        <div>

            <Link
                to="/captain-login"
                className='bg-[#d4cd00d0] flex items-center justify-center rounded mt-6 mb-5 px-4 py-2 w-full text-lg text-[#130000]'
            >
                Sign in as Captain 🚀
            </Link>

        </div>

    </div>
);


};

export default App;
