const FilterReducer = (state, action) => {
  let tempProducts;
  switch (action.type) {
    case "load_filter_products":
      let prices = action.payload.map((product) => product.price);
      let maxPrice = Math.max(...prices);
      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
        curMaxPrice: maxPrice,
        maxPrice: maxPrice,
      };
    case "set_gird":
      return {
        ...state,
        grid_view: true,
      };
    case "set_list":
      return {
        ...state,
        grid_view: false,
      };
    case "sort":
      state.filter_loading = true;
      const newFilterProduct = [...state.filter_products];
      switch (action.payload) {
        case "lowest":
          newFilterProduct.sort((a, b) => a.price - b.price);

          break;
        case "highest":
          newFilterProduct.sort((a, b) => b.price - a.price);

          break;
        case "a-z":
          newFilterProduct.sort((a, b) => a.name.localeCompare(b.name));

          break;
        case "z-a":
          newFilterProduct.sort((a, b) => b.name.localeCompare(a.name));

          break;
        default:
          break;
      }
      return {
        ...state,
        filter_products: newFilterProduct,
        filter_loading: false,
      };
    // search reducer
    case "search_filter":
      const filtered = state.all_products.filter((item) =>
        item.name.toLowerCase().includes(action.payload)
      );
      return { ...state, filter_products: filtered };
    //filter---
    case "update_filter":
      return {
        ...state,
        [action.name]: action.payload,
      };

    case "filter_filtered_products":
      let tempProducts = state.all_products;

      // Category filter
      if (state.curCategory !== "All") {
        tempProducts = tempProducts.filter(
          (item) => item.category === state.curCategory
        );
      }

      // Company filter
      if (state.curCompany !== "All") {
        tempProducts = tempProducts.filter(
          (item) => item.company === state.curCompany
        );
      }

      // Color filter
      if (state.curColor !== "All") {
        tempProducts = tempProducts.filter((item) =>
          item.colors.includes(state.curColor)
        );
      }

      // Price filter
      tempProducts = tempProducts.filter(
        (item) => item.price <= state.curMaxPrice
      );

      return {
        ...state,
        filter_products: tempProducts,
      };

    case "clear_filters":
      return {
        ...state,
        curCategory: "All",
        curColor: "All",
        curCompany: "All",
        curMaxPrice: state.maxPrice,
      };

    default:
      return state;
  }
};

export default FilterReducer;
