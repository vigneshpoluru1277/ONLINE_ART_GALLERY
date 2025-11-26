import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '', role: 'BUYER' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, form)
      .then(() => {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => window.location.assign('/login'), 2000);
      })
      .catch(err => {
        if (err.response && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Registration failed!");
        }
      });
  };

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh"}}>
      <div style={{width: 350}}>
        <h2 style={{textAlign: "center", marginBottom: 30}}>Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Username"
            value={form.username}
            onChange={e => setForm({...form, username: e.target.value})}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
            required
          />

          <select
            className="form-control mb-3"
            value={form.role}
            onChange={e => setForm({...form, role: e.target.value})}
          >
            <option value="BUYER">Buyer</option>
            <option value="SELLER">Seller</option>
            <option value="ADMIN">Admin</option>
          </select>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <button className="btn btn-success w-100" type="submit">Register</button>

          <p style={{textAlign: "center", marginTop: 16}}>
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
