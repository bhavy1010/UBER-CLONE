import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { BrowserRouter } from 'react-router-dom';

import UserContext from './context/UserContext';
import CaptainContext from './context/CaptainContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <UserContext>

      <CaptainContext>

        <BrowserRouter>
          <App />
        </BrowserRouter>

      </CaptainContext>

    </UserContext>

  </React.StrictMode>
);