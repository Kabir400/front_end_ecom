import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "./reducers/ProductRducer.js";
const AppContext = createContext();
const API = "https://api.pujakaitem.com/api/products";

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  singleProduct: {},
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //get all product---
  const getProduct = async (url) => {
    dispatch({ type: "set_loading" });
    try {
      const { data } = await axios.get(url);
      dispatch({ type: "set_feature_data", payload: data });
    } catch (err) {
      dispatch({ type: "api_error" });
    }
  };
  //-----------------------

  //get single product-----
  const getSingleProduct = async (url) => {
    dispatch({ type: "set_loading" });
    try {
      const { data } = await axios.get(url);
      dispatch({ type: "set_single_data", payload: data });
    } catch (err) {
      dispatch({ type: "api_error" });
    }
  };

  useEffect(() => {
    getProduct(API);
  }, []);
  return (
    <AppContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </AppContext.Provider>
  );
};

//custom hooks
const useProductContext = () => {
  return useContext(AppContext);
};
export { AppProvider, useProductContext };
