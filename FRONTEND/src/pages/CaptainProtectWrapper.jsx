import React, {
    useContext,
    useEffect,
    useState
} from 'react';

import {
    useNavigate
} from 'react-router-dom';

import axios from 'axios';

import {
    CaptainDataContext
} from '../context/CaptainContext';

const CaptainProtectWrapper = ({
    children
}) => {

    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(true);

    const { setCaptain } =
        useContext(CaptainDataContext);

    useEffect(() => {

        const checkCaptain =
            async () => {

                const token =
                    localStorage.getItem(
                        'captainToken'
                    );

                console.log(
                    "CAPTAIN TOKEN:",
                    token
                );

                if (!token) {

                    console.log(
                        "NO CAPTAIN TOKEN FOUND"
                    );

                    navigate(
                        '/captain-login'
                    );

                    return;
                }

                try {

                    const response =
                        await axios.get(
                            `${import.meta.env.VITE_BASE_URL}/captains/profile`,
                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        );

                    console.log(
                        "PROFILE RESPONSE:",
                        response.data
                    );

                    if (
                        response.status === 200
                    ) {

                        setCaptain(
                            response.data
                        );

                        setLoading(false);
                    }

                } catch (error) {

                    console.log(
                        "CAPTAIN PROTECT ERROR STATUS:",
                        error.response?.status
                    );

                    console.log(
                        "CAPTAIN PROTECT ERROR DATA:",
                        error.response?.data
                    );

                    console.log(
                        "FULL ERROR:",
                        error
                    );

                    // DON'T REMOVE TOKEN YET
                    // localStorage.removeItem('captainToken');

                    setLoading(false);

                    navigate(
                        '/captain-login'
                    );

                }

            };

        checkCaptain();

    }, [navigate, setCaptain]);

    if (loading) {

        return (
            <div className="h-screen flex items-center justify-center">
                <h2 className="text-lg font-semibold">
                    Loading...
                </h2>
            </div>
        );

    }

    return children;

};

export default CaptainProtectWrapper;