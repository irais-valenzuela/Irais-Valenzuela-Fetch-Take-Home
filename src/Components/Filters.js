import { useEffect, useState } from "react";
import axios from "axios";

const Filters = ({ setFilterItem, setSortDirection }) => {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const { data } = await axios.get(
          "https://frontend-take-home-service.fetch.com/dogs/breeds",
          { withCredentials: true, credentials: "include" }
        );

        setBreeds(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBreeds();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "sort") {
      let direction = e.target.value;
      if (direction === "A-Z") {
        direction = "asc";
      } else direction = "desc";
      setSortDirection(direction);
    } else if (e.target.name === "breeds") {
      let selectedBreed = e.target.value;
      setFilterItem(selectedBreed);
    }
  };
  return (
    <div className="centered-filters">
      <label htmlFor="sort">Sort Alphabetically</label>
      <select className="select" onChange={handleChange} name="sort" id="sort">
        <option>select</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
      <label htmlFor="breeds">Filter by breed</label>
      <select
        className="select"
        onChange={handleChange}
        name="breeds"
        id="breeds"
      >
        <option>select</option>
        <option value="All">All</option>
        {breeds &&
          breeds.map((breed, idx) => {
            return (
              <option key={idx} value={breed}>
                {breed}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Filters;
