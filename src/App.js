import React from "react";
import logo from "./logo.svg";
import "./App.css";
import RoutesComponent from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <header>
        <RoutesComponent />
      </header>
    </div>
  );
}

export default App;
