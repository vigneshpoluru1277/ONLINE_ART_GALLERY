import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import CheckoutModal from './CheckoutModal.jsx';

export default function CartBadge() {
  const { cart } = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowCheckout(true)}
        style={{
          background: '#3498db',
          color: '#fff',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          fontWeight: 600,
          fontSize: 20,
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <span role="img" aria-label="cart" style={{ fontSize: 26 }}>🛒</span>
        <span style={{ fontSize: 18, fontWeight: 'bold' }}>{cart.length}</span>
      </button>

      {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
    </>
  );
}
