import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login({ email, password });
      sessionStorage.setItem('user', JSON.stringify(res.data));
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-box">
        <h1>Patient Portal</h1>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()} />
        {error && <div className="error">{error}</div>}
        <button className="btn-primary" onClick={handleLogin}>Login</button>
        <div style={{ marginTop: 16, textAlign: 'center', fontSize: '0.85rem', color: '#888' }}>
          Admin? <a href="/admin">Go to Admin</a>
        </div>
      </div>
    </div>
  );
}
