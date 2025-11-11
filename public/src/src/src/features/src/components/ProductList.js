import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cartSlice";

const sampleProducts = [
  { id: "p1", name: "Laptop", price: 1200 },
  { id: "p2", name: "Mouse", price: 25 },
  { id: "p3", name: "Keyboard", price: 45 }
];

export default function ProductList() {
  const dispatch = useDispatch();

  const handleAdd = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div className="products">
      <h2>Products</h2>
      <div className="product-grid">
        {sampleProducts.map((p) => (
          <div className="product-card" key={p.id}>
            <h3>{p.name}</h3>
            <p className="price">${p.price}</p>
            <button onClick={() => handleAdd(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
