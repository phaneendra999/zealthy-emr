import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAppointments } from '../api';

export default function PatientAppointments() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user') || 'null');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!user) { navigate('/'); return; }
    getAppointments(user.id).then(r => {
      const now = new Date();
      const in3months = new Date();
      in3months.setMonth(now.getMonth() + 3);
      // Filter upcoming up to 3 months out
      const filtered = r.data.filter(a => {
        const d = new Date(a.datetime);
        return d >= now && d <= in3months;
      });
      // Sort ascending
      filtered.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
      setAppointments(filtered);
    });
  }, []);

  return (
    <div>
      <nav className="nav">
        <span>Patient Portal</span>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/my-prescriptions">Prescriptions</Link>
        <button className="btn-secondary" style={{ marginLeft: 'auto' }}
          onClick={() => { sessionStorage.clear(); navigate('/'); }}>Logout</button>
      </nav>
      <div className="container">
        <h1>Upcoming Appointments</h1>
        <p style={{ color: '#888', marginBottom: 16, fontSize: '0.9rem' }}>Showing next 3 months</p>
        {appointments.length === 0 ? <p style={{ color: '#888' }}>No upcoming appointments.</p> : (
          <table>
            <thead>
              <tr><th>Provider</th><th>Date & Time</th><th>Repeat</th><th>Ends On</th></tr>
            </thead>
            <tbody>
              {appointments.map(a => (
                <tr key={a.id}>
                  <td>{a.provider}</td>
                  <td>{new Date(a.datetime).toLocaleString()}</td>
                  <td>{a.repeatSchedule ? <span className="tag">{a.repeatSchedule}</span> : '—'}</td>
                  <td>{a.repeatEnd || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
