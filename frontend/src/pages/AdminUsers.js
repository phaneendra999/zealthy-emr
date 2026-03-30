import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsersSummary, createUser } from '../api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const load = () => getUsersSummary().then(r => setUsers(r.data));

  useEffect(() => { load(); }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleCreate = async () => {
    if (!form.name || !form.email || !form.password) return alert('All fields required');
    await createUser(form);
    setShowForm(false);
    setForm({ name: '', email: '', password: '' });
    load();
  };

  return (
    <div>
      <nav className="nav">
        <span>Admin — Mini EMR</span>
      </nav>
      <div className="container">
        <div className="actions">
          <h1 style={{ flex: 1 }}>Patients</h1>
          <button className="btn-primary" onClick={() => setShowForm(true)}>+ New Patient</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Appointments</th>
              <th>Prescriptions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/users/${u.id}`)}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td><span className="tag">{u.appointmentCount}</span></td>
                <td><span className="tag">{u.prescriptionCount}</span></td>
              </tr>
            ))}
          </tbody>
        </table>

        {showForm && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>New Patient</h2>
              <label>Name</label>
              <input value={form.name} onChange={e => set('name', e.target.value)} />
              <label>Email</label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)} />
              <label>Password</label>
              <input type="password" value={form.password} onChange={e => set('password', e.target.value)} />
              <div className="modal-actions">
                <button className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                <button className="btn-primary" onClick={handleCreate}>Create</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
