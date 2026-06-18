import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainProtectWrapper = ({ children }) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { setCaptain } = useContext(CaptainDataContext);

    useEffect(() => {

        const checkCaptain = async () => {

            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/captain-login');
                return;
            }

            try {

                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/captains/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (response.status === 200) {
                    setCaptain(response.data);
                    setLoading(false);
                }

            } catch (error) {

                localStorage.removeItem('token');
                navigate('/captain-login');

            }

        };

        checkCaptain();

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

export default CaptainProtectWrapper;