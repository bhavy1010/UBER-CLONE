import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Start from './pages/Start';
import Home from './pages/Home';
import CaptainHome from './pages/CaptainHome';

import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';

import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';

import UserProtectWrapper from './pages/UserProtectWrapper';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper';

import UserLogout from './pages/UserLogout';
import CaptainLogout from './pages/CaptainLogout';

import Riding from './pages/Riding';
import CaptainRiding from './pages/CaptainRiding';

import RatingPage from './pages/RatingPage';

const App = () => {
  return (
    <Routes>

      <Route path="/" element={<Start />} />

      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />

      <Route path="/Riding" element={<Riding />} />
      <Route path="/rating" element={<RatingPage />} />
      <Route path="/captain-Riding" element={<CaptainRiding />} />

      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/captain-signup" element={<CaptainSignup />} />

      <Route
        path="/home"
        element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        }
      />

      <Route
        path="/captain-home"
        element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        }
      />

      <Route
        path="/user/logout"
        element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        }
      />

      <Route
        path="/captain/logout"
        element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        }
      />

    </Routes>
  );
};

export default App;