import React, { useState, useEffect } from 'react';

export default function AppointmentModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState({
    provider: '',
    datetime: '',
    repeatSchedule: '',
    repeatEnd: '',
    ...initial,
  });

  useEffect(() => {
    if (initial) setForm({ provider: '', datetime: '', repeatSchedule: '', repeatEnd: '', ...initial });
  }, [initial]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{initial?.id ? 'Edit Appointment' : 'Add Appointment'}</h2>
        <label>Provider</label>
        <input value={form.provider} onChange={e => set('provider', e.target.value)} />
        <label>Date & Time</label>
        <input type="datetime-local" value={form.datetime ? form.datetime.slice(0, 16) : ''} onChange={e => set('datetime', e.target.value)} />
        <label>Repeat</label>
        <select value={form.repeatSchedule || ''} onChange={e => set('repeatSchedule', e.target.value)}>
          <option value="">None</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        {form.repeatSchedule && (
          <>
            <label>End Recurring On (optional)</label>
            <input type="date" value={form.repeatEnd || ''} onChange={e => set('repeatEnd', e.target.value)} />
          </>
        )}
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={() => onSave(form)}>Save</button>
        </div>
      </div>
    </div>
  );
}
