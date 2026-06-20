import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'leaflet/dist/leaflet.css';

import { BrowserRouter } from 'react-router-dom';

import UserContext from './context/UserContext';
import CaptainContext from './context/CaptainContext';
import SocketProvider from './context/SocketContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <UserContext>

      <CaptainContext>

        <SocketProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SocketProvider>

      </CaptainContext>

    </UserContext>

  </React.StrictMode>
);