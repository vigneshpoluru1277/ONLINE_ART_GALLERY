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


// ------------------- AUTH PROTECTION --------------------
function RequireAuth({ children }) {
  const isLoggedIn = Boolean(localStorage.getItem("role"));
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}


// ------------------- MAIN APP --------------------
function App() {
  const role = localStorage.getItem("role");

  return (
    <CartProvider>
      <Router>
        <Routes>

          {/* ---------------- Home (Protected) ---------------- */}
          <Route
            path="/"
            element={
              <RequireAuth>
                <div>
                  <Navbar />

                  <div style={{ display: "flex", justifyContent: "flex-end", marginRight: 35, marginTop: 8 }}>
                    <CartBadge />
                  </div>

                  <div style={{ minHeight: "100vh", background: "#f4f7fa", padding: "20px" }}>
                    <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>

                      <h1 style={{ textAlign: "center", marginBottom: 30, color: "#34495e" }}>
                        Art Gallery
                      </h1>

                      {/* Only Admin Can Add or Manage Art */}
                      {role === "ADMIN" && <AddArtForm onArtAdded={() => window.location.reload()} />}

                      {/* Art List Visible to Everyone Logged In */}
                      <ArtList />

                      {/* Admin Panel */}
                      {role === "ADMIN" && <AdminDashboard />}
                    </div>
                  </div>
                </div>
              </RequireAuth>
            }
          />

          {/* ---------------- Login Page ---------------- */}
          <Route
            path="/login"
            element={
              <div style={{ minHeight: "100vh", background: "#f4f7fa" }}>
                <h1 style={{ textAlign: "center", paddingTop: 40, color: "#34495e" }}>
                  Art Gallery
                </h1>
                <Login />
              </div>
            }
          />

          {/* ---------------- Register Page ---------------- */}
          <Route
            path="/register"
            element={
              <div style={{ minHeight: "100vh", background: "#f4f7fa" }}>
                <h1 style={{ textAlign: "center", paddingTop: 40, color: "#34495e" }}>
                  Art Gallery
                </h1>
                <Register />
              </div>
            }
          />

          {/* ---------------- Wildcard: Redirect Unknown Routes to Home/Login ---------------- */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
