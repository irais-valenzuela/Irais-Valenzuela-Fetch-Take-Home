import React from "react";
import Carousel from "./Carousel";

const LandingPage = () => {
  window.localStorage.removeItem("selectedDogs");
  return <Carousel />;
};

export default LandingPage;
