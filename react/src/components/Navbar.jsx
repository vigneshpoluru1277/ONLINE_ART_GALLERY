import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';

export default function Navbar({ onCartClick }) {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav style={{
      background: '#2c3e50',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ margin: 0, color: '#fff', fontSize: '24px' }}>🎨 Art Gallery</h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(255,255,255,0.1)',
          padding: '8px 16px',
          borderRadius: '8px'
        }}>
          <span style={{ color: '#fff', fontSize: '14px' }}>
            👤 <strong>{username}</strong>
          </span>
          <span style={{
            background: role === 'ADMIN'
              ? '#e74c3c'
              : role === 'SELLER'
              ? '#3498db'
              : '#27ae60',
            color: '#fff',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            {role}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {(role === 'BUYER' || role === 'ADMIN') && (
            <button
              onClick={onCartClick}
              style={{
                background: '#3498db',
                color: '#fff',
                borderRadius: '8px',
                padding: '10px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                border: 'none',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              <span style={{ fontSize: '20px' }}>🛒</span>
              <span>{cart.length}</span>
            </button>
          )}

          <button
            onClick={handleLogout}
            style={{
              background: '#e74c3c',
              color: '#fff',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
