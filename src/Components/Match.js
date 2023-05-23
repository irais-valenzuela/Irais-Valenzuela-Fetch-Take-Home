import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Match = () => {
  const [match, setMatch] = useState("");
  const [dog, setDog] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        "https://frontend-take-home-service.fetch.com/auth/logout",
        { withCredentials: true, credentials: "include" }
      );
    } catch (error) {
      navigate("/");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        let arrayOfSelectedDogIds = JSON.parse(
          window.localStorage.getItem("selectedDogs")
        );
        const { data } = await axios.post(
          `https://frontend-take-home-service.fetch.com/dogs/match`,
          arrayOfSelectedDogIds,
          { withCredentials: true, credentials: "include" }
        );
        setMatch(data.match);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMatch();
  }, []);

  useEffect(() => {
    const fetchMatchedDog = async () => {
      try {
        const { data } = await axios.post(
          `https://frontend-take-home-service.fetch.com/dogs`,
          [match],
          { withCredentials: true, credentials: "include" }
        );
        setDog(data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMatchedDog();
    setLoading(false);
  }, [match]);
  return (
    <div className="burnt-orange-background ">
      {loading ? (
        <div>
          <h1 className="margin-for-match-heading ">Finding Your Match...</h1>
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="match-result-display ">
          <h1 className="margin-for-match-heading ">
            Hooray, we found your Match! 🎉🐶
          </h1>
          <Card
            style={{
              width: "18rem",
              backgroundColor: "rgb(255, 207, 145)",
              border: "solid 2px white",
              color: "black",
            }}
          >
            <Card.Img variant="top" src={dog.img} />
            <Card.Body>
              <Card.Title>Name: {dog.name}</Card.Title>
              <Card.Text>Age: {dog.age}</Card.Text>
              <Card.Text>Breed: {dog.breed}</Card.Text>
              <Card.Text>Zipcode: {dog.zip_code}</Card.Text>
            </Card.Body>
          </Card>
          <br />
          <Button variant="danger" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      )}
    </div>
  );
};

export default Match;
