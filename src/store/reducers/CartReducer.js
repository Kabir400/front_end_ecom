export default function CartReducer(state, action) {
  switch (action.type) {
    case "add_to_cart":
      const { id, color, amount, product } = action.payload;
      const tempCart = {
        id: id + color,
        amount,
        color,
        name: product.name,
        image: product.image[0].url,
        price: product.price,
        max: product.stock,
      };

      let cartIndex = state.cart.findIndex(
        (item, index) => item.id === tempCart.id
      );
      if (cartIndex >= 0) {
        state.cart[cartIndex].amount = state.cart[cartIndex].amount + amount;
        if (state.cart[cartIndex].amount > state.cart[cartIndex].max) {
          state.cart[cartIndex].amount = state.cart[cartIndex].max;
        }
        return {
          ...state,
        };
      }

      return {
        ...state,
        cart: [...state.cart, tempCart],
      };
    case "remove_cart_items":
      const removeCart = state.cart.filter(
        (item, index) => item.id !== action.payload
      );
      return {
        ...state,
        cart: removeCart,
      };
    case "clear_cart":
      return {
        ...state,
        cart: [],
      };
    case "amount_inc":
      let amountIndex = state.cart.findIndex(
        (item) => item.id === action.payload
      );
      if (
        amountIndex >= 0 &&
        state.cart[amountIndex].amount < state.cart[amountIndex].max
      ) {
        let newCart = [...state.cart];
        newCart[amountIndex].amount = newCart[amountIndex].amount + 1;
        return {
          ...state,
          cart: newCart,
        };
      }
      return {
        ...state,
      };
    case "amount_dec":
      let decIndex = state.cart.findIndex((item) => item.id === action.payload);
      if (decIndex >= 0 && state.cart[decIndex].amount > 1) {
        let newCart = [...state.cart];
        newCart[decIndex].amount = newCart[decIndex].amount - 1;
        return {
          ...state,
          cart: newCart,
        };
      }
      return {
        ...state,
      };

    // case "total_item":
    //   let totalItem = state.cart.reduce((a, b) => {
    //     return a + b.amount;
    //   }, 0);
    //   return {
    //     ...state,
    //     total_item: totalItem,
    //   };
    // case "cal_subtotal":
    //   let subtotal = state.cart.reduce((a, b) => {
    //     return a + b.amount * b.price;
    //   }, 0);
    //   return {
    //     ...state,
    //     total_price: subtotal,
    //   };
    case "total_item_subtotal":
      let { total_item, total_subtotal } = state.cart.reduce(
        (a, b) => {
          a.total_item = a.total_item + b.amount;
          a.total_subtotal = a.total_subtotal + b.price * b.amount;
          return a;
        },
        { total_item: 0, total_subtotal: 0 }
      );
      return { ...state, total_item, total_price: total_subtotal };
    default:
      return state;
  }
}
