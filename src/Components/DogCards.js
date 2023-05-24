import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function DogCards({ id, img, age, breed, name, zip_code, setDisabledButton }) {
  const [saved, setSaved] = useState(false);

  const handleClick = (dog) => {
    setSaved(true);
    setDisabledButton(true);
    if (window.localStorage.getItem("selectedDogs")) {
      let array = JSON.parse(window.localStorage.getItem("selectedDogs"));
      array.push(dog.id);
      window.localStorage.setItem("selectedDogs", JSON.stringify(array));
    } else {
      window.localStorage.setItem("selectedDogs", JSON.stringify([dog.id]));
    }
  };

  return (
    <Card
      className="results-flexbox"
      style={{
        width: "18rem",
        backgroundColor: "rgb(255, 207, 145)",
        border: "solid 2px white",
        color: "black",
      }}
    >
      <Card.Img className="dog-card-imgs" variant="top" src={img} alt={breed} />
      <Card.Body>
        <Card.Title>Name: {name}</Card.Title>
        <Card.Text>Age: {age}</Card.Text>
        <Card.Text>Breed: {breed}</Card.Text>
        <Card.Text>Zipcode: {zip_code}</Card.Text>
        <Button
          onClick={() => handleClick({ id, img, age, breed, name, zip_code })}
          variant="warning"
          style={{ border: "solid 2px white" }}
        >
          {saved === true ? "Selected!" : "Select"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default DogCards;
