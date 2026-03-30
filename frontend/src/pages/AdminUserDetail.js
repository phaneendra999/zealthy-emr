import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getUser, updateUser,
  getAppointments, createAppointment, updateAppointment, deleteAppointment,
  getPrescriptions, createPrescription, updatePrescription, deletePrescription,
  getMedications, getDosages
} from '../api';
import AppointmentModal from '../components/AppointmentModal';
import PrescriptionModal from '../components/PrescriptionModal';

export default function AdminUserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [medications, setMedications] = useState([]);
  const [dosages, setDosages] = useState([]);

  const [apptModal, setApptModal] = useState(null);   // null = closed, {} = new, {...} = edit
  const [rxModal, setRxModal] = useState(null);

  const [editingUser, setEditingUser] = useState(false);
  const [userForm, setUserForm] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    loadAll();
    getMedications().then(r => setMedications(r.data));
    getDosages().then(r => setDosages(r.data));
  }, [id]);

  const loadAll = () => {
    getUser(id).then(r => { setUser(r.data); setUserForm({ name: r.data.name, email: r.data.email, password: '' }); });
    getAppointments(id).then(r => setAppointments(r.data));
    getPrescriptions(id).then(r => setPrescriptions(r.data));
  };

  const saveUser = async () => {
    await updateUser(id, userForm);
    setEditingUser(false);
    loadAll();
  };

  const saveAppt = async (form) => {
    const payload = { ...form, userId: Number(id) };
    if (form.id) await updateAppointment(form.id, payload);
    else await createAppointment(payload);
    setApptModal(null);
    getAppointments(id).then(r => setAppointments(r.data));
  };

  const saveRx = async (form) => {
    const payload = { ...form, userId: Number(id), quantity: Number(form.quantity) };
    if (form.id) await updatePrescription(form.id, payload);
    else await createPrescription(payload);
    setRxModal(null);
    getPrescriptions(id).then(r => setPrescriptions(r.data));
  };

  const delAppt = async (apptId) => {
    if (!window.confirm('Delete this appointment?')) return;
    await deleteAppointment(apptId);
    getAppointments(id).then(r => setAppointments(r.data));
  };

  const delRx = async (rxId) => {
    if (!window.confirm('Delete this prescription?')) return;
    await deletePrescription(rxId);
    getPrescriptions(id).then(r => setPrescriptions(r.data));
  };

  if (!user) return <div className="container">Loading...</div>;

  return (
    <div>
      <nav className="nav">
        <span>Admin — Mini EMR</span>
        <span className="back-link" onClick={() => navigate('/admin')}>← Back to Users</span>
      </nav>
      <div className="container">

        {/* User Info */}
        <div className="card">
          {editingUser ? (
            <>
              <h2>Edit User</h2>
              <div className="form-row">
                <div><label>Name</label><input value={userForm.name} onChange={e => setUserForm(f => ({ ...f, name: e.target.value }))} /></div>
                <div><label>Email</label><input value={userForm.email} onChange={e => setUserForm(f => ({ ...f, email: e.target.value }))} /></div>
                <div><label>New Password</label><input type="password" value={userForm.password} onChange={e => setUserForm(f => ({ ...f, password: e.target.value }))} /></div>
              </div>
              <button className="btn-primary" onClick={saveUser}>Save</button>
              <button className="btn-secondary" onClick={() => setEditingUser(false)}>Cancel</button>
            </>
          ) : (
            <>
              <div className="info-grid">
                <div className="info-item"><label>Name</label><span>{user.name}</span></div>
                <div className="info-item"><label>Email</label><span>{user.email}</span></div>
              </div>
              <button className="btn-secondary" onClick={() => setEditingUser(true)}>Edit User</button>
            </>
          )}
        </div>

        {/* Appointments */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h2 style={{ margin: 0 }}>Appointments</h2>
          <button className="btn-primary" onClick={() => setApptModal({})}>+ Add</button>
        </div>
        <table style={{ marginTop: 10 }}>
          <thead><tr><th>Provider</th><th>Date & Time</th><th>Repeat</th><th>Ends On</th><th>Actions</th></tr></thead>
          <tbody>
            {appointments.map(a => (
              <tr key={a.id}>
                <td>{a.provider}</td>
                <td>{new Date(a.datetime).toLocaleString()}</td>
                <td>{a.repeatSchedule ? <span className="tag">{a.repeatSchedule}</span> : '—'}</td>
                <td>{a.repeatEnd || '—'}</td>
                <td>
                  <button className="btn-secondary" onClick={() => setApptModal(a)}>Edit</button>
                  <button className="btn-danger" onClick={() => delAppt(a.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && <tr><td colSpan={5} style={{ color: '#888' }}>None</td></tr>}
          </tbody>
        </table>

        {/* Prescriptions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24 }}>
          <h2 style={{ margin: 0 }}>Prescriptions</h2>
          <button className="btn-primary" onClick={() => setRxModal({})}>+ Add</button>
        </div>
        <table style={{ marginTop: 10 }}>
          <thead><tr><th>Medication</th><th>Dosage</th><th>Qty</th><th>Refill On</th><th>Schedule</th><th>Actions</th></tr></thead>
          <tbody>
            {prescriptions.map(p => (
              <tr key={p.id}>
                <td>{p.medication}</td>
                <td>{p.dosage}</td>
                <td>{p.quantity}</td>
                <td>{p.refillOn || '—'}</td>
                <td>{p.refillSchedule ? <span className="tag">{p.refillSchedule}</span> : '—'}</td>
                <td>
                  <button className="btn-secondary" onClick={() => setRxModal(p)}>Edit</button>
                  <button className="btn-danger" onClick={() => delRx(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {prescriptions.length === 0 && <tr><td colSpan={6} style={{ color: '#888' }}>None</td></tr>}
          </tbody>
        </table>
      </div>

      {apptModal !== null && (
        <AppointmentModal initial={apptModal} onSave={saveAppt} onClose={() => setApptModal(null)} />
      )}
      {rxModal !== null && (
        <PrescriptionModal initial={rxModal} medications={medications} dosages={dosages} onSave={saveRx} onClose={() => setRxModal(null)} />
      )}
    </div>
  );
}
