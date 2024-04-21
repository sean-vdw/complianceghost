import React, { useCallback, useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import { useAuth0 } from '@auth0/auth0-react';

import Home from './components/home';
import LandingPage from './components/LandingPage';
import Navbar from './components/navbar';
import Footer from './components/footer';
import RegisterForm from './components/RegisterForm';
import SignIn from './components/SignIn';
import Profile from './components/Profile';

function UserRoutes() {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    window.location.href = 'https://dev-haebwa8jada12quw.us.auth0.com/u/login';
    return null;
  }

  return (
    isAuthenticated && (
      <div>
        <Navbar />
        <Home />
        <Footer />
        <Routes>
          <Route path='/user/profile' element={<Profile />} />
        </Routes>
      </div>  
    )
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
