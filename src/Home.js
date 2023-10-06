import React from "react";
import HeroSection from "./components/HeroSection.js";
import Trusted from "./components/Trusted.js";
import Services from "./components/Services.js";
import FeatureProduct from "./components/FeatureProduct.js";

const Home = () => {
  const data = {
    name: "Flick Store",
  };

  return (
    <>
      <HeroSection myData={data} />
      <FeatureProduct />
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
