import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';

export default function ArtList() {
  const [arts, setArts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const userRole = localStorage.getItem('role');
  const username = localStorage.getItem('username');

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchArts();
  }, []);

  const fetchArts = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/arts`)
      .then(res => setArts(res.data))
      .catch(err => console.error('Error fetching arts:', err));
  };

  const handleEdit = (art) => {
    setEditId(art.id);
    setEditData({ ...art });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios.put(`${import.meta.env.VITE_API_URL}/api/arts/${editId}`, editData)
      .then(() => {
        setEditId(null);
        fetchArts();
      })
      .catch(err => console.error('Error updating art:', err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this art?')) {
      axios.delete(`${import.meta.env.VITE_API_URL}/api/arts/${id}`)
        .then(() => fetchArts())
        .catch(err => console.error('Error deleting art:', err));
    }
  };

  const handleAddToCart = (art) => {
    addToCart(art);
    alert(`${art.title} added to cart!`);
  };

  const canModify = (art) => {
    if (userRole === 'ADMIN') return true;
    if (userRole === 'SELLER' && art.artist === username) return true;
    return false;
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      marginTop: '20px'
    }}>
      {arts.map(art => (
        <div key={art.id} style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '15px',
          background: '#fff'
        }}>
          {editId === art.id ? (
            <div>
              <input
                name="title"
                value={editData.title}
                onChange={handleEditChange}
                style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
              />
              <input
                name="artist"
                value={editData.artist}
                onChange={handleEditChange}
                style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
              />
              <input
                name="price"
                type="number"
                value={editData.price}
                onChange={handleEditChange}
                style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
              />
              <input
                name="imageUrl"
                value={editData.imageUrl}
                onChange={handleEditChange}
                style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
              />

              <button onClick={handleUpdate}
                style={{ marginRight: '10px', padding: '8px 16px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px' }}>
                Save
              </button>
              <button onClick={() => setEditId(null)}
                style={{ padding: '8px 16px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px' }}>
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <img
                src={art.imageUrl}
                alt={art.title}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available'; }}
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }}
              />

              <h3 style={{ margin: '10px 0' }}>{art.title}</h3>
              <p style={{ color: '#666', margin: '5px 0' }}>By: {art.artist}</p>
              <p style={{ fontWeight: 'bold', fontSize: '18px', margin: '10px 0' }}>₹{art.price}</p>

              {(userRole === 'BUYER' || userRole === 'ADMIN') && (
                <button
                  onClick={() => handleAddToCart(art)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    marginBottom: '10px',
                    cursor: 'pointer'
                  }}>
                  Add to Cart
                </button>
              )}

              {canModify(art) && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => handleEdit(art)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      background: '#ffc107',
                      color: '#000',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}>
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(art.id)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      background: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
