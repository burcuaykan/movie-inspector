import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./SearchRow.scss";

interface ISearchRowProps {
  movieTitle: string;
  releaseYear: string;
  type: string;
  setMovieTitle: (movieTitle: string) => void;
  setReleaseYear: (movieYear: string) => void;
  setType: (type: string) => void;
  handleSearch: () => void;
}

const SearchRow = ({
  movieTitle,
  releaseYear,
  type,
  setMovieTitle,
  setReleaseYear,
  setType,
  handleSearch,
}: ISearchRowProps): JSX.Element => {
  return (
    <div id="search-row">
      <TextField
        className="search-input"
        label="Movie Title"
        variant="outlined"
        value={movieTitle}
        onChange={(event) => setMovieTitle(event.target.value)}
      />
      <TextField
        className="search-input"
        label="Release Year"
        variant="outlined"
        value={releaseYear}
        onChange={(event) => setReleaseYear(event.target.value)}
      />
      <FormControl>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          className="search-input select"
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          <MenuItem value="">
            <em>Select a type</em>
          </MenuItem>
          <MenuItem value={"movie"}>Movie</MenuItem>
          <MenuItem value={"series"}>TV Series</MenuItem>
          <MenuItem value={"episode"}>TV Series episodes</MenuItem>
        </Select>
      </FormControl>
      <Button onClick={handleSearch} variant="contained">
        Search
      </Button>
    </div>
  );
};
export default SearchRow;
