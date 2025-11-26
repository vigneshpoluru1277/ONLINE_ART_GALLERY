import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { username, password })
      .then(res => {
        const user = res.data;
        localStorage.setItem('username', user.username);
        localStorage.setItem('role', user.role);
        navigate('/', { replace: true });
      })
      .catch(err => {
        if (err.response) {
          if (typeof err.response.data === "object" && err.response.data.message) {
            setError(err.response.data.message);
          } else {
            setError("Invalid username or password!");
          }
        } else {
          setError("Server unreachable!");
        }
      });
  };

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh"}}>
      <div style={{width: 350}}>
        <h2 style={{textAlign: "center", marginBottom: 30}}>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          {error && <div className="alert alert-danger">{error}</div>}

          <button className="btn btn-primary w-100" type="submit">Login</button>

          <p style={{textAlign: "center", marginTop: 16}}>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}
