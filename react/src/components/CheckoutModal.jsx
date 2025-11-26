import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext.jsx';

export default function CheckoutModal({ onClose }) {
  const { cart, clearCart } = useContext(CartContext);
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handlePayment = (e) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setStep(3);
      clearCart();
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget && step !== 3 && !processing) {
          onClose();
        }
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        backdropFilter: 'blur(2px)'
      }}
    >
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
      }}>
        {/** Full code continues EXACTLY AS YOUR ORIGINAL */}
                {!processing && step !== 3 && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'transparent',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              color: '#666',
              zIndex: 10,
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#f0f0f0'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
          >
            ×
          </button>
        )}

        {step === 1 && (
          <div style={{ padding: '30px' }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Your Cart</h2>
            {cart.length === 0 ? (
              <div>
                <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Your cart is empty</p>
                <button
                  onClick={onClose}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: '#6c757d',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {cart.map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '15px',
                    borderBottom: '1px solid #eee'
                  }}>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0' }}>{item.title}</h4>
                      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>by {item.artist}</p>
                    </div>
                    <div style={{ fontWeight: 'bold', fontSize: '16px' }}>₹{item.price}</div>
                  </div>
                ))}

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '20px 15px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  borderTop: '2px solid #333',
                  marginTop: '10px'
                }}>
                  <span>Total:</span>
                  <span style={{ color: '#28a745' }}>₹{totalAmount}</span>
                </div>

                <button
                  onClick={() => setStep(2)}
                  style={{
                    width: '100%',
                    padding: '15px',
                    background: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    marginTop: '10px',
                    fontWeight: '600',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#218838'}
                  onMouseLeave={(e) => e.target.style.background = '#28a745'}
                >
                  Proceed to Payment
                </button>
              </>
            )}
          </div>
        )}

        {step === 2 && (
          <div style={{ padding: '30px' }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Payment Details</h2>

            <div style={{
              background: '#f8f9fa',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <p style={{ margin: '0 0 5px 0', color: '#666' }}>Total Amount</p>
              <h3 style={{ margin: 0, color: '#28a745', fontSize: '28px' }}>₹{totalAmount}</h3>
            </div>

            <form onSubmit={handlePayment}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  value={paymentForm.cardNumber}
                  onChange={(e) =>
                    setPaymentForm({
                      ...paymentForm,
                      cardNumber: formatCardNumber(e.target.value.replace(/\s/g, '').slice(0, 16))
                    })
                  }
                  required
                  disabled={processing}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={paymentForm.cardName}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, cardName: e.target.value })}
                  required
                  disabled={processing}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px',
                marginBottom: '20px'
              }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength="5"
                    value={paymentForm.expiryDate}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length >= 2) {
                        value = value.slice(0, 2) + '/' + value.slice(2, 4);
                      }
                      setPaymentForm({ ...paymentForm, expiryDate: value });
                    }}
                    required
                    disabled={processing}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength="3"
                    value={paymentForm.cvv}
                    onChange={(e) =>
                      setPaymentForm({ ...paymentForm, cvv: e.target.value.replace(/\D/g, '') })}
                    required
                    disabled={processing}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={processing}
                  style={{
                    flex: 1,
                    padding: '15px',
                    background: processing ? '#ccc' : '#6c757d',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    cursor: processing ? 'not-allowed' : 'pointer'
                  }}
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={processing}
                  style={{
                    flex: 2,
                    padding: '15px',
                    background: processing ? '#ccc' : '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    cursor: processing ? 'not-allowed' : 'pointer',
                    fontWeight: '600'
                  }}
                >
                  {processing ? 'Processing...' : `Pay ₹${totalAmount}`}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div style={{ padding: '60px 30px', textAlign: 'center' }}>
            <div style={{
              fontSize: '72px',
              marginBottom: '20px',
              color: '#28a745'
            }}>
              ✓
            </div>
            <h2 style={{ color: '#28a745', marginBottom: '10px', fontSize: '28px' }}>
              Payment Successful!
            </h2>
            <p style={{ color: '#666', fontSize: '18px' }}>
              Thank you for your purchase of ₹{totalAmount}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
