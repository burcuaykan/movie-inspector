import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import MovieList from "./pages/MovieList/MovieList";
import "./App.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/:imdbID" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
