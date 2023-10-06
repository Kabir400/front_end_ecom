import React from "react";
import HeroSection from "./components/HeroSection.js";

const About = () => {
  const data = {
    name: "Flick Eccomerce",
  };

  return (
    <>
      <HeroSection myData={data} />
    </>
  );
};

export default About;
