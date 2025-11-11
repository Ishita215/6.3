import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity, clearCart } from "../features/cartSlice";

export default function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  const handleQtyChange = (id, value) => {
    dispatch(updateQuantity({ id, quantity: value }));
  };

  if (items.length === 0) {
    return (
      <div className="cart">
        <h2>Shopping Cart</h2>
        <p className="empty">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <ul className="cart-list">
        {items.map((it) => (
          <li key={it.id} className="cart-item">
            <div className="left">
              <span className="item-name">{it.name}</span>
              <span className="item-price">(${it.price})</span>
            </div>

            <div className="right">
              <input
                type="number"
                min="1"
                value={it.quantity}
                onChange={(e) => handleQtyChange(it.id, e.target.value)}
                className="qty-input"
              />
              <button className="remove" onClick={() => dispatch(removeItem(it.id))}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-footer">
        <strong>Total: ${total.toFixed(2)}</strong>
        <div className="cart-actions">
          <button onClick={() => dispatch(clearCart())} className="clear">
            Clear Cart
          </button>
          <button
            onClick={() => alert(`Demo checkout — total: $${total.toFixed(2)}`)}
            className="checkout"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
