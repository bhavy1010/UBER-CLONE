import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserProtectWrapper = ({ children }) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [, setUser] = useContext(UserDataContext);

    useEffect(() => {

        const checkUser = async () => {

            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                return;
            }

            try {

                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/users/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (response.status === 200) {
                    setUser(response.data.user);
                    setLoading(false);
                }

            } catch (error) {

                localStorage.removeItem('token');
                navigate('/login');

            }

        };

        checkUser();

    }, [navigate]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return children;
};

export default UserProtectWrapper;