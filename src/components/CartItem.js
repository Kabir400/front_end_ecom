import React from "react";
import FormatPrice from "./FormatPrice.js";
import { FaTrash } from "react-icons/fa";
import CartAmountToggle from "./CartAmountToggle.js";
import { useCartContext } from "../store/CartContext.js";
const CartItem = ({ id, name, image, color, price, amount }) => {
  const { removeCartItems, amountInc, amountDec } = useCartContext();

  return (
    <div className="cart_heading grid grid-five-column">
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={image} alt={id} />
          </figure>
        </div>
        <div>
          <p>{name}</p>
          <div className="color-div">
            <p>color:</p>
            <div
              className="color-style"
              style={{ backgroundColor: color, color: color }}
            ></div>
          </div>
        </div>
      </div>
      {/* price   */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </div>

      {/* Quantity  */}
      <CartAmountToggle
        amount={amount}
        id={id}
        color={color}
        setDec={amountDec}
        setInc={amountInc}
      />
      {/* //Subtotal */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price * amount} />
        </p>
      </div>

      <div>
        <FaTrash className="remove_icon" onClick={() => removeCartItems(id)} />
      </div>
    </div>
  );
};

export default CartItem;
