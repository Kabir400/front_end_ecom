import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import CartAmountToggle from "./CartAmountToggle.js";
import { Button } from "../styles/Button.js";
import { useCartContext } from "../store/CartContext.js";
export default function AddToCart({ product }) {
  const { id, colors, stock } = product;
  const [amount, setAmount] = useState(1);
  const [color, setColor] = useState(colors[0]);
  const { addToCart } = useCartContext();

  const setInc = () => {
    if (amount < stock) {
      setAmount(amount + 1);
    } else {
      setAmount(amount);
    }
  };

  const setDec = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    } else {
      setAmount(amount);
    }
  };
  return (
    <Wrapper>
      <div className="colors">
        <p>
          colors:
          {colors.map((item, index) => {
            return (
              <button
                key={index}
                style={{ backgroundColor: item }}
                className={color === item ? "btnStyle active" : "btnStyle"}
                onClick={() => setColor(item)}
              >
                {color === item ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })}
        </p>
      </div>
      {/* add to cart  */}
      <CartAmountToggle amount={amount} setDec={setDec} setInc={setInc} />

      <NavLink to="/cart" onClick={() => addToCart(id, color, amount, product)}>
        <Button className="btn">Add To Cart</Button>
      </NavLink>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;
