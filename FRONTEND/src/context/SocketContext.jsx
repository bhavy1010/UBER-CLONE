import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
    const socket = useMemo(() => {
    const baseUrl =
        import.meta.env.VITE_BASE_URL ||
        'http://localhost:4000';

    return io(baseUrl, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000
    });
}, []);

    useEffect(() => {

    console.log("Socket URL:",
        import.meta.env.VITE_BASE_URL
    );

    socket.on('connect', () => {
        console.log('Socket connected:', socket.id);
    });

    socket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
    });

    socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error.message);
    });

}, [socket]);

    const sendMessage = (eventName, payload, targetId = null) => {
        if (!socket || !socket.connected || !eventName) {
            return false;
        }

        socket.emit('sendMessage', {
            eventName,
            data: payload,
            targetId
        });

        return true;
    };

    const receiveMessage = (eventName, callback) => {
        if (!socket || !eventName || typeof callback !== 'function') {
            return () => {};
        }

        socket.on(eventName, callback);

        return () => {
            socket.off(eventName, callback);
        };
    };

    return (
        <SocketContext.Provider
            value={{
                socket,
                sendMessage,
                receiveMessage
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
