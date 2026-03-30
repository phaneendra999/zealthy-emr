import React, { useState, useEffect } from 'react';

export default function PrescriptionModal({ initial, medications, dosages, onSave, onClose }) {
  const [form, setForm] = useState({
    medication: '',
    dosage: '',
    quantity: '',
    refillOn: '',
    refillSchedule: '',
    ...initial,
  });

  useEffect(() => {
    if (initial) setForm({ medication: '', dosage: '', quantity: '', refillOn: '', refillSchedule: '', ...initial });
  }, [initial]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{initial?.id ? 'Edit Prescription' : 'Add Prescription'}</h2>
        <label>Medication</label>
        <select value={form.medication} onChange={e => set('medication', e.target.value)}>
          <option value="">Select...</option>
          {medications.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
        </select>
        <label>Dosage</label>
        <select value={form.dosage} onChange={e => set('dosage', e.target.value)}>
          <option value="">Select...</option>
          {dosages.map(d => <option key={d.value} value={d.value}>{d.value}</option>)}
        </select>
        <label>Quantity</label>
        <input type="number" value={form.quantity} onChange={e => set('quantity', e.target.value)} />
        <label>Refill On</label>
        <input type="date" value={form.refillOn || ''} onChange={e => set('refillOn', e.target.value)} />
        <label>Refill Schedule</label>
        <select value={form.refillSchedule || ''} onChange={e => set('refillSchedule', e.target.value)}>
          <option value="">None</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={() => onSave(form)}>Save</button>
        </div>
      </div>
    </div>
  );
}
