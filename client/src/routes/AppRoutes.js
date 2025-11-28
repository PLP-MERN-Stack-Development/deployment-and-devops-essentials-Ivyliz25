import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
const Dashboard = lazy(() => import('../pages/Dashboard'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
