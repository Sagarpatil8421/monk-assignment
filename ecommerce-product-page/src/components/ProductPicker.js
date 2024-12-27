import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";

const ProductPicker = ({ isOpen, onClose, onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://stageapi.monkcommerce.app/task/products/search`,
          {
            params: { search, page, limit: 10 },
            headers: { "x-api-key": "YOUR_API_KEY" },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [search, page]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Select Products</h2>
      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <span>{product.title}</span>
            <button onClick={() => onSelectProduct(product)}>Select</button>
          </div>
        ))}
      </div>
      <button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
    </Modal>
  );
};

export default ProductPicker;
