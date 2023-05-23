import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Auth = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "email") setEmail(e.target.value);
    else setName(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInput = { name, email };
      const { data } = await axios.post(
        "https://frontend-take-home-service.fetch.com/auth/login",
        userInput,
        { withCredentials: true, credentials: "include" }
      );

      if (data === "OK") {
        navigate("/search");
      } else {
        setError("Please make sure to add name and email to login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="getting-started burnt-orange-background"
      onSubmit={handleSubmit}
    >
      <h1 className="login login-bold ">Login</h1>
      <label className="label" htmlFor="name">
        Name
      </label>
      <input
        className="input"
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="name"
      ></input>
      <label className="label" htmlFor="email">
        Email
      </label>
      <input
        className="input"
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
        placeholder="email"
      ></input>
      <button className="submit">Submit</button>
      {!error ? error : ""}
    </form>
  );
};

export default Auth;
