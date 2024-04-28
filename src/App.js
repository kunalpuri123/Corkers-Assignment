import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import DineIn from './pages/DineIn';
import DineOut from './pages/DineOut';
import Profile from './pages/Profile';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dine-in" element={<DineIn />} />
        <Route path="/dine-out" element={<DineOut />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
