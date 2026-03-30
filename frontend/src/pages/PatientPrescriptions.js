import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getPrescriptions } from '../api';

export default function PatientPrescriptions() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user') || 'null');
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    if (!user) { navigate('/'); return; }
    getPrescriptions(user.id).then(r => {
      const sorted = [...r.data].sort((a, b) => {
        if (!a.refillOn) return 1;
        if (!b.refillOn) return -1;
        return new Date(a.refillOn) - new Date(b.refillOn);
      });
      setPrescriptions(sorted);
    });
  }, []);

  return (
    <div>
      <nav className="nav">
        <span>Patient Portal</span>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/my-appointments">Appointments</Link>
        <button className="btn-secondary" style={{ marginLeft: 'auto' }}
          onClick={() => { sessionStorage.clear(); navigate('/'); }}>Logout</button>
      </nav>
      <div className="container">
        <h1>My Prescriptions</h1>
        {prescriptions.length === 0 ? <p style={{ color: '#888' }}>No prescriptions.</p> : (
          <table>
            <thead>
              <tr>
                <th>Medication</th>
                <th>Dosage</th>
                <th>Qty</th>
                <th>Refill On</th>
                <th>Refill Schedule</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map(p => {
                const refillSoon = p.refillOn && (() => {
                  const d = new Date(p.refillOn);
                  const now = new Date();
                  const in7 = new Date(); in7.setDate(now.getDate() + 7);
                  return d >= now && d <= in7;
                })();
                return (
                  <tr key={p.id}>
                    <td>{p.medication}</td>
                    <td>{p.dosage}</td>
                    <td>{p.quantity}</td>
                    <td>
                      {p.refillOn
                        ? <span style={{ color: refillSoon ? '#e67e22' : 'inherit', fontWeight: refillSoon ? 600 : 'normal' }}>
                            {p.refillOn}{refillSoon ? ' ⚠' : ''}
                          </span>
                        : '—'}
                    </td>
                    <td>{p.refillSchedule ? <span className="tag">{p.refillSchedule}</span> : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
