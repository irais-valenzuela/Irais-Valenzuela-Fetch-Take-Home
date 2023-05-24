import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/auth");
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/My project (2).jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3 className="headings-for-carousel">
            Welcome to my dog adoption website
          </h3>
          <p className="smaller-font-landing-page">
            Click start to browse through our 1000+ available dogs!
          </p>
          <Button
            className="landing-page-button "
            onClick={handleClick}
            variant="success"
          >
            Start
          </Button>{" "}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/My project-1.png"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3 className="headings-for-carousel">
            Welcome to my dog adoption website
          </h3>
          <p className="smaller-font-landing-page">
            Click start to browse through our 1000+ available dogs!
          </p>
          <Button
            className="landing-page-button "
            onClick={handleClick}
            variant="success"
          >
            Start
          </Button>{" "}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
