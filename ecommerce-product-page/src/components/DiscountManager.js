import React, { useState } from "react";

const DiscountManager = ({ onApplyDiscount }) => {
  const [discount, setDiscount] = useState("");

  const handleApplyDiscount = () => {
    if (!discount) return;
    onApplyDiscount(discount);
    setDiscount("");
  };

  return (
    <div className="discount-manager">
      <input
        type="text"
        placeholder="Enter discount"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
      />
      <button onClick={handleApplyDiscount}>Apply</button>
    </div>
  );
};

export default DiscountManager;
