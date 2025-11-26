import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import ArtList from './components/ArtList.jsx';
import AddArtForm from './components/AddArtForm.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import CartBadge from './components/CartBadge.jsx';
import Navbar from './components/Navbar.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import { CartProvider } from './context/CartContext.jsx';

function RequireAuth({ children }) {
  const isLoggedIn = !!localStorage.getItem('role');
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function App() {
  const userRole = localStorage.getItem('role');

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Navbar />
                <div style={{ display: "flex", justifyContent: "flex-end", marginRight: 35, marginTop: 8 }}>
                  <CartBadge />
                </div>

                <div style={{ minHeight: "100vh", background: "#f4f7fa", padding: "20px" }}>
                  <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#34495e" }}>
                      Art Gallery
                    </h1>

                    <AddArtForm onArtAdded={() => window.location.reload()} />
                    <ArtList />

                    {userRole === 'ADMIN' && <AdminDashboard />}
                  </div>
                </div>
              </RequireAuth>
            }
          />

          <Route path="/login"
            element={
              <div style={{ minHeight: "100vh", background: "#f4f7fa" }}>
                <h1 style={{ textAlign: "center", paddingTop: "40px", color: "#34495e" }}>
                  Art Gallery
                </h1>
                <Login />
              </div>
            }
          />

          <Route path="/register"
            element={
              <div style={{ minHeight: "100vh", background: "#f4f7fa" }}>
                <h1 style={{ textAlign: "center", paddingTop: "40px", color: "#34495e" }}>
                  Art Gallery
                </h1>
                <Register />
              </div>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
