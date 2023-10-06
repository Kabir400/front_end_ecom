import {
  Children,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import reducer from "./reducers/FilterReducer.js";
import { useProductContext } from "./ProductContext";
const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  filter_loading: false,
  grid_view: true,
  curCategory: "All",
  curCompany: "All",
  curColor: "All",
  curMaxPrice: 0,
  maxPrice: 0,
};

const FilterProvider = ({ children }) => {
  const { products } = useProductContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  //grid view---
  const setGridView = () => {
    return dispatch({ type: "set_gird" });
  };

  //list view---
  const setListView = () => {
    return dispatch({ type: "set_list" });
  };

  //sorting--
  const sorting = (e) => {
    const value = e.target.value;
    return dispatch({ type: "sort", payload: value });
  };

  //search filter---
  const searchFilter = (e) => {
    const value = e.target.value;
    return dispatch({ type: "search_filter", payload: value });
  };

  //update Filter--
  const updateFilter = (e) => {
    const value = e.target.value;
    const FilterName = e.target.name;

    return dispatch({
      type: "update_filter",
      name: FilterName,
      payload: value,
    });
  };

  //clear filter--
  const clearFilters = () => {
    dispatch({ type: "clear_filters" });
  };

  useEffect(() => {
    dispatch({ type: "filter_filtered_products" });
  }, [state.curCategory, state.curCompany, state.curColor, state.curMaxPrice]);

  useEffect(() => {
    dispatch({ type: "load_filter_products", payload: products });
  }, [products]);
  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        sorting,
        searchFilter,
        updateFilter,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

const useFilterContext = () => {
  return useContext(FilterContext);
};
export { FilterProvider, useFilterContext };
