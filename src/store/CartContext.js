import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducers/CartReducer.js";
const cartContext = createContext();
//functions for localStorage--
const getLocalCartData = () => {
  let localCartData = localStorage.getItem("flick_cart_item");
  if (localCartData) {
    try {
      let parsedData = JSON.parse(localCartData);
      return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
      console.error("Error parsing cart data from local storage:", error);
      return [];
    }
  } else {
    return [];
  }
};

const initialState = {
  cart: getLocalCartData(),
  total_item: 0,
  total_price: 0,
  shipping_fee: 5000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //add to cart--
  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "add_to_cart", payload: { id, color, amount, product } });
  };
  //remove cart items--
  const removeCartItems = (id) => {
    dispatch({ type: "remove_cart_items", payload: id });
  };
  //clear cart--
  const clearCart = () => {
    dispatch({ type: "clear_cart" });
  };
  //incriment--
  const amountInc = (id) => {
    dispatch({ type: "amount_inc", payload: id });
  };
  //decriment--
  const amountDec = (id) => {
    dispatch({ type: "amount_dec", payload: id });
  };

  //setting up data in localStorage---
  useEffect(() => {
    // dispatch({ type: "total_item" });
    // dispatch({ type: "cal_subtotal" });
    dispatch({ type: "total_item_subtotal" });
    localStorage.setItem("flick_cart_item", JSON.stringify(state.cart));
  }, [state.cart, state.total_item]);

  return (
    <cartContext.Provider
      value={{
        ...state,
        addToCart,
        removeCartItems,
        clearCart,
        amountDec,
        amountInc,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(cartContext);
};

export { CartProvider, useCartContext };
