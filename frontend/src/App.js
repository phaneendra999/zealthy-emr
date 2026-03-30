import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminUsers from './pages/AdminUsers';
import AdminUserDetail from './pages/AdminUserDetail';
import Login from './pages/Login';
import PatientDashboard from './pages/PatientDashboard';
import PatientAppointments from './pages/PatientAppointments';
import PatientPrescriptions from './pages/PatientPrescriptions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Patient Portal */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/my-appointments" element={<PatientAppointments />} />
        <Route path="/my-prescriptions" element={<PatientPrescriptions />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminUsers />} />
        <Route path="/admin/users/:id" element={<AdminUserDetail />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
