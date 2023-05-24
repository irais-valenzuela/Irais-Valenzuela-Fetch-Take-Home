import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Filters from "./Filters";
import PaginationComponent from "./Pagination";
import Spinner from "react-bootstrap/Spinner";
import DogCards from "./DogCards";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [resultIds, setResultIds] = useState([]);
  const [filterItem, setFilterItem] = useState("");
  const [dogs, setDogs] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [newContent, setNewContent] = useState([]);
  const [disabledButton, setDisabledButton] = useState(
    !!window.localStorage.getItem("selectedDogs")
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleClick = () => navigate("/match");

  useEffect(() => {
    setNewContent([]);
    const fetchDogBreeds = async () => {
      try {
        const { data } = await axios.get(
          filterItem
            ? filterItem === "All"
              ? `https://frontend-take-home-service.fetch.com/dogs/search?sort=breed:${sortDirection}&size=36`
              : `https://frontend-take-home-service.fetch.com/dogs/search?breeds=${filterItem}&size=36`
            : `https://frontend-take-home-service.fetch.com/dogs/search?sort=breed:${sortDirection}&size=36`,
          { withCredentials: true, credentials: "include" }
        );
        setResultIds(data.resultIds);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDogBreeds();
  }, [filterItem, sortDirection]);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const { data } = await axios.post(
          "https://frontend-take-home-service.fetch.com/dogs",
          newContent.length ? newContent : resultIds,
          { withCredentials: true, credentials: "include" }
        );
        setDogs(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDogs();
  }, [resultIds, newContent]);

  return (
    <div className="burnt-orange-background ">
      {!loading ? (
        <>
          <h1 className="search-heading">
            Search for your next furry friend!🐶
          </h1>
          <Filters
            setFilterItem={setFilterItem}
            setSortDirection={setSortDirection}
          />
          <br />
          {!disabledButton ? (
            <>
              <br />
              <p>*Please select your favorite dogs to generate a match</p>
              <Button variant="success" disabled>
                Find Match
              </Button>
            </>
          ) : (
            <>
              <p>When you're ready click find match to generate a dog match</p>
              <Button onClick={handleClick} variant="success">
                Find Match{" "}
              </Button>
            </>
          )}
          <br />
          <br />

          <div className="results-flexbox">
            {dogs.map((dogObject) => {
              return (
                <DogCards
                  key={dogObject.id}
                  setDisabledButton={setDisabledButton}
                  id={dogObject.id}
                  img={dogObject.img}
                  name={dogObject.name}
                  breed={dogObject.breed}
                  age={dogObject.age}
                  zip_code={dogObject.zip_code}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div className="margin-searching-available-dogs">
          <h1 className="search-heading">Fetching all available Dogs 🐶</h1>
          <Spinner animation="border" />
        </div>
      )}
      <br />
      <PaginationComponent setNewContent={setNewContent} />
    </div>
  );
};

export default SearchPage;
