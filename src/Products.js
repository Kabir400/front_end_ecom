import styled from "styled-components";
import FilterSection from "./components/FilterSection.js";
import ProductList from "./components/ProductList.js";
import Sort from "./components/Sort.js";
import { useFilterContext } from "./store/FilterContex.js";

const Products = () => {
  let { filter_loading } = useFilterContext();
  return (
    <Wrapper>
      <div className="container grid grid-filter-column">
        <div>
          <FilterSection />
        </div>

        <section className="product-view--sort">
          <div className="sort-filter">
            <Sort />
          </div>
          <div className="main-product">
            {filter_loading ? (
              <div className="filter_loading">
                <h2>loading....</h2>
              </div>
            ) : (
              <ProductList />
            )}
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .grid-filter-column {
    grid-template-columns: 0.2fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }
  }
  .filter_loading {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Products;
