import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    setError("");

    let url = `${import.meta.env.VITE_API_URL}/api/auth/users`;
    if (filter !== 'ALL') {
      url = `${import.meta.env.VITE_API_URL}/api/auth/users/role/${filter}`;
    }

    axios.get(url)
      .then(res => {
        if (Array.isArray(res.data)) {
          setUsers(res.data.filter(u => u.role !== 'ADMIN'));
        } else {
          setError("Unexpected data format from server");
        }
      })
      .catch(() => setError("Failed to fetch users"));

  }, [filter, deleting, updating]);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    setDeleting(id);

    axios.delete(`${import.meta.env.VITE_API_URL}/api/auth/users/${id}`)
      .then(() => setDeleting(null))
      .catch(() => {
        setError('Failed to delete user');
        setDeleting(null);
      });
  };

  const handleRefund = (user) => {
    const amt = prompt("Enter refund amount:");
    const num = parseFloat(amt);
    if (!amt || isNaN(num) || num <= 0) return;

    setUpdating(user.id);

    axios.put(
      `${import.meta.env.VITE_API_URL}/api/auth/users/${user.id}/refund`,
      { amount: num }
    )
      .then(resp => {
        alert(resp.data.message);
        setUpdating(null);
      })
      .catch(() => {
        alert("Refund failed!");
        setUpdating(null);
      });
  };

  return (
    <div style={{
      background: '#fff',
      padding: '20px',
      borderRadius: '8px',
      margin: '20px 0'
    }}>
      <h2>User List</h2>

      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setFilter('ALL')}
                style={{ marginRight: 8, fontWeight: filter === 'ALL' ? 'bold' : 'normal' }}>
          All
        </button>
      </div>

      {error && <div style={{ color: 'red', marginBottom: 20 }}>{error}</div>}

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 16
      }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th>Username</th>
            <th></th>
            <th></th>
            <th>Role</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan={6} style={{ textAlign: 'center', padding: 8 }}>No users found</td></tr>
          ) : users.map(u => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td style={{ fontWeight: 'bold' }}>{u.role}</td>
              <td>{u.balance?.toFixed(2) ?? "0.00"}</td>

              <td>
                <button
                  onClick={() => handleDelete(u.id)}
                  disabled={deleting === u.id}
                  style={{
                    background: "#e74c3c",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    padding: "4px 12px",
                    cursor: "pointer"
                  }}
                >
                  {deleting === u.id ? 'Deleting...' : 'Delete'}
                </button>

                {u.role === 'SELLER' && (
                  <button
                    onClick={() => handleRefund(u)}
                    disabled={updating === u.id}
                    style={{
                      background: "#3498db",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      padding: "4px 12px",
                      marginLeft: 8,
                      cursor: "pointer"
                    }}
                  >
                    {updating === u.id ? 'Refunding...' : 'Refund'}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
