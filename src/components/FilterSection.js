import React from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { useFilterContext } from "../store/FilterContex";
import FormatPrice from "./FormatPrice";
import { Button } from "../styles/Button";

const getCategoryData = (data, property) => {
  let newValue = data.map((item) => {
    return item[property];
  });

  if (property === "colors") {
    newValue = ["All", ...new Set([].concat(...newValue))];
  } else {
    newValue = ["All", ...new Set(newValue)];
  }
  return newValue;
};

export default function FilterSection() {
  const {
    searchFilter,
    all_products,
    curCategory,
    curColor,
    curMaxPrice,
    updateFilter,
    clearFilters,
    curCompany,
  } = useFilterContext();
  const categoryData = getCategoryData(all_products, "category");
  const companyData = getCategoryData(all_products, "company");
  const colorsData = getCategoryData(all_products, "colors");

  let priceArr = all_products.map((item) => item.price);
  let maxPrice = Math.max(...priceArr);
  return (
    <Wrapper>
      <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            placeholder="Search"
            onChange={searchFilter}
          />
        </form>
      </div>
      <div className="filter-category">
        <h3>Category</h3>
        <div>
          {categoryData.map((curElem, index) => {
            return (
              <button
                key={index}
                type="button"
                name="curCategory"
                value={curElem}
                className={curElem === curCategory ? "active" : ""}
                onClick={updateFilter}
              >
                {curElem}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter-company">
        <h3>Company</h3>

        <form action="#">
          <select
            name="curCompany"
            id="company"
            className="filter-company--select"
            onChange={updateFilter}
            value={curCompany}
          >
            {companyData.map((curElem, index) => {
              return (
                <option key={index} value={curElem} name="company">
                  {curElem}
                </option>
              );
            })}
          </select>
        </form>
      </div>
      {/* colors */}
      <div className="filter-colors colors">
        <h3>Colors</h3>

        <div className="filter-color-style">
          {colorsData.map((item, index) => {
            if (item === "All") {
              return (
                <button
                  key={index}
                  type="button"
                  value={item}
                  name="curColor"
                  className="color-all--style"
                  style={{
                    textDecoration: curColor === "All" ? "underline" : "none",
                  }}
                  onClick={updateFilter}
                >
                  all
                </button>
              );
            }
            return (
              <button
                key={index}
                type="button"
                value={item}
                name="curColor"
                style={{ backgroundColor: item }}
                className={curColor === item ? "btnStyle active" : "btnStyle"}
                onClick={updateFilter}
              >
                {curColor === item ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })}
        </div>
      </div>
      {/* price Filter */}
      <div className="filter_price">
        <h3>Price</h3>
        <p>
          <FormatPrice price={curMaxPrice} />
        </p>
        <input
          type="range"
          name="curMaxPrice"
          min={0}
          value={curMaxPrice}
          max={maxPrice}
          onChange={updateFilter}
        />
      </div>
      {/* clear filters */}
      <div className="filter-clear">
        <Button className="btn" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
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

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;
