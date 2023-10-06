import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";

const Header = () => {
  return (
    <MainHeader>
      <NavLink to="/">
        <div className="logo-div">
          <button className="logo-button">
            <p className="logo-p">Flick</p>
          </button>
          <button className="logo-sidebar"></button>
        </div>
      </NavLink>
      <Nav />
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .logo {
    height: 5rem;
  }
  .logo-div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo-button {
    padding: 1px 15px;
    background-color: #063364;
    box-shadow: 6px;
    height: 37px;
  }
  .logo-button:hover {
    background-color: #225993;
    cursor: pointer;
  }
  .logo-p {
    font-size: 22px;

    font-weight: 700;
    color: #dbd5d5;
  }
  .logo-sidebar {
    height: 37px;
    width: 38px;
    border-radius: 0px;
    background-color: white;
  }
  .logo-button:hover ~ .logo-sidebar {
    background-color: #f4f4f4;
  }
`;
export default Header;
