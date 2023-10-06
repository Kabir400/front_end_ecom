import React from "react";
import { useFilterContext } from "../store/FilterContex.js";
import GridView from "./GridView.js";
import ListView from "./ListView.js";

const ProductList = () => {
  const { filter_products, grid_view } = useFilterContext();

  if (grid_view) {
    return <GridView products={filter_products} />;
  }

  if (!grid_view) {
    return <ListView products={filter_products} />;
  }
};

export default ProductList;
