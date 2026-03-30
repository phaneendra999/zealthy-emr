import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAppointments, getPrescriptions } from '../api';

function within7Days(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const in7 = new Date();
  in7.setDate(now.getDate() + 7);
  return d >= now && d <= in7;
}

export default function PatientDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user') || 'null');
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    if (!user) { navigate('/'); return; }
    getAppointments(user.id).then(r => setAppointments(r.data));
    getPrescriptions(user.id).then(r => setPrescriptions(r.data));
  }, []);

  const upcomingAppts = appointments.filter(a => within7Days(a.datetime));
  const upcomingRefills = prescriptions.filter(p => p.refillOn && within7Days(p.refillOn));

  return (
    <div>
      <nav className="nav">
        <span>Patient Portal</span>
        <Link to="/my-appointments">All Appointments</Link>
        <Link to="/my-prescriptions">All Prescriptions</Link>
        <button className="btn-secondary" style={{ marginLeft: 'auto' }}
          onClick={() => { sessionStorage.clear(); navigate('/'); }}>Logout</button>
      </nav>
      <div className="container">
        <div className="card">
          <div className="info-grid">
            <div className="info-item"><label>Name</label><span>{user?.name}</span></div>
            <div className="info-item"><label>Email</label><span>{user?.email}</span></div>
          </div>
        </div>

        <h2>Upcoming Appointments (next 7 days)</h2>
        {upcomingAppts.length === 0 ? <p style={{ color: '#888' }}>None</p> : (
          <table>
            <thead><tr><th>Provider</th><th>Date & Time</th><th>Repeat</th></tr></thead>
            <tbody>
              {upcomingAppts.map(a => (
                <tr key={a.id}>
                  <td>{a.provider}</td>
                  <td>{new Date(a.datetime).toLocaleString()}</td>
                  <td>{a.repeatSchedule ? <span className="tag">{a.repeatSchedule}</span> : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <h2>Upcoming Refills (next 7 days)</h2>
        {upcomingRefills.length === 0 ? <p style={{ color: '#888' }}>None</p> : (
          <table>
            <thead><tr><th>Medication</th><th>Dosage</th><th>Refill On</th></tr></thead>
            <tbody>
              {upcomingRefills.map(p => (
                <tr key={p.id}>
                  <td>{p.medication}</td>
                  <td>{p.dosage}</td>
                  <td>{p.refillOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
