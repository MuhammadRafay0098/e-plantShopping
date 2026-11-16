import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addItem } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      total += parseFloat(item.cost.substring(1)) * item.quantity;
    });
    return total.toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.substring(1));
    return (cost * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black', textAlign: 'center' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.name} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <img className="cart-item-image" src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '20px' }} />
              <div className="cart-item-details" style={{ flexGrow: 1 }}>
                <div className="cart-item-name" style={{ fontWeight: 'bold', fontSize: '18px' }}>{item.name}</div>
                <div className="cart-item-cost" style={{ color: '#666' }}>Unit Price: {item.cost}</div>
                <div className="cart-item-quantity" style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                  <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)} style={{ padding: '5px 10px', cursor: 'pointer' }}>-</button>
                  <span className="cart-item-quantity-value" style={{ margin: '0 15px' }}>{item.quantity}</span>
                  <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)} style={{ padding: '5px 10px', cursor: 'pointer' }}>+</button>
                </div>
                <div className="cart-item-total" style={{ fontWeight: 'bold' }}>Total: ${calculateTotalCost(item)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)} style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', marginTop: '5px' }}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="continue_shopping_btn" style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Continue Shopping</button>
        <button className="get-started-button1" onClick={() => alert('Functionality to be added for future reference')} style={{ padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;