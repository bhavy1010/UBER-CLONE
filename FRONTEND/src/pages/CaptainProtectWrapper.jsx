import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainProtectWrapper = ({ children }) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

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