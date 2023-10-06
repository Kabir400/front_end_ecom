const ProductReducer = (state, action) => {
  switch (action.type) {
    case "set_loading":
      return {
        ...state,
        isLoading: true,
      };

    case "api_error":
      return { ...state, isLoading: false, isError: true };

    case "set_feature_data":
      const featureData = action.payload.filter((item) => {
        return item.featured === true;
      });
      return {
        ...state,
        isLoading: false,
        products: action.payload,
        featureProducts: featureData,
      };
    case "set_single_data":
      return { ...state, isLoading: false, singleProduct: action.payload };

    default:
      return state;
  }
};

export default ProductReducer;
