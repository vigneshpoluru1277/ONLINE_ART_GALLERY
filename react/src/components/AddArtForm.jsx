import React, { useState } from 'react';
import axios from 'axios';

export default function AddArtForm({ onArtAdded }) {
  const [form, setForm] = useState({ title: '', artist: '', price: '' });
  const [imageFile, setImageFile] = useState(null);
  const userRole = localStorage.getItem('role');
  const username = localStorage.getItem('username');

  if (userRole !== 'ADMIN' && userRole !== 'SELLER') return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('artist', userRole === 'SELLER' ? username : form.artist);
    formData.append('price', form.price);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    axios.post(
      `${import.meta.env.VITE_API_URL}/api/arts`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
      .then(() => {
        setForm({ title: '', artist: '', price: '' });
        setImageFile(null);
        document.getElementById('imageInput').value = '';
        alert('Art added successfully!');
        onArtAdded();
      })
      .catch(err => console.error('Error adding art:', err));
  };

  return (
    <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ddd' }}>
      <h3 style={{ marginTop: 0 }}>Add New Art</h3>
      <form onSubmit={handleSubmit}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />

        {userRole === 'ADMIN' ? (
          <input
            type="text"
            placeholder="Artist"
            value={form.artist}
            onChange={e => setForm({ ...form, artist: e.target.value })}
            required
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        ) : (
          <input
            type="text"
            value={username}
            disabled
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', background: '#f0f0f0' }}
          />
        )}

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          required
          style={{
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            gridColumn: 'span 2'
          }}
        />

        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={e => setImageFile(e.target.files[0])}
          style={{
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            gridColumn: 'span 2'
          }}
        />

        <button
          type="submit"
          style={{
            gridColumn: 'span 2',
            padding: '12px',
            background: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Add Art
        </button>
      </form>
    </div>
  );
}
