import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const CartAmountToggle = ({ amount, setDec, setInc, id, color }) => {
  return (
    <div className="cart-button">
      <div className="amount-toggle">
        <button onClick={() => setDec(id)}>
          <FaMinus />
        </button>
        <div className="amount-style">{amount}</div>
        <button onClick={() => setInc(id)}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default CartAmountToggle;
