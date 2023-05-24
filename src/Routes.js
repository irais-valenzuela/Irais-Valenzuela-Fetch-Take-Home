import { Route, Routes } from "react-router-dom";
import Carousel from "./Components/Carousel";
import SearchPage from "./Components/SearchPage";
import Match from "./Components/Match";
import Auth from "./Components/Auth";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Carousel />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/match" element={<Match />} />
    </Routes>
  );
};

export default RoutesComponent;
