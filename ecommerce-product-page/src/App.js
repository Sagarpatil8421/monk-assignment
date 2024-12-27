import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "", discount: null, discountType: null },
  ]);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      name: "",
      discount: null,
      discountType: null,
    };
    setProducts([...products, newProduct]);
  };

  const handleAddDiscount = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id
        ? { ...product, discount: 0, discountType: "% Off" }
        : product
    );
    setProducts(updatedProducts);
  };

  const handleInputChange = (id, field, value) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, [field]: value } : product
    );
    setProducts(updatedProducts);
  };

  const handleRemoveProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  return (
    <div className="App">
      <div className="container">
        <h1>Add Products</h1>
        {products.map((product) => (
          <div className="draggable-item" key={product.id}>
            <span className="drag-handle">::</span>
            <input
              type="text"
              placeholder="Select Product"
              value={product.name}
              onClick={handleOpenPopup}
              readOnly
            />
            {product.discount !== null ? (
              <>
                <input
                  type="number"
                  placeholder="Discount"
                  value={product.discount}
                  onChange={(e) =>
                    handleInputChange(product.id, "discount", e.target.value)
                  }
                />
                <select
                  value={product.discountType}
                  onChange={(e) =>
                    handleInputChange(product.id, "discountType", e.target.value)
                  }
                >
                  <option value="% Off">% Off</option>
                  <option value="Flat Off">Flat Off</option>
                </select>
              </>
            ) : (
              <button
                className="add-discount-btn"
                onClick={() => handleAddDiscount(product.id)}
              >
                Add Discount
              </button>
            )}
            <button
              className="remove-btn"
              onClick={() => handleRemoveProduct(product.id)}
            >
              ✕
            </button>
          </div>
        ))}
        <button className="add-product-btn" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-header">
              <h2>Select Products</h2>
              <button className="close-btn" onClick={handleClosePopup}>
                ✕
              </button>
            </div>
            <div className="popup-body">
              {/* Add product listing table or cards here */}
              <p>Product list goes here...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
